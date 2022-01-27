async function routes (fastify, options) {
  const db = fastify.sqlite.db
  
  function fetchTodos(request, reply, done) {
    db.all('SELECT rowid AS id, * FROM todos', [], function(err, rows) {
      if (err) { return done(err); }
    
      const todos = rows.map(row => {
        return {
          id: row.id,
          title: row.title,
          completed: row.completed == 1 ? true : false,
          url: '/' + row.id
        }
      })
      const activeCount = todos.filter(todo => !todo.completed).length
      const completedCount = todos.length - activeCount
      
      reply.locals = {
        todos: todos,
        activeCount: activeCount,
        completedCount: completedCount
      }
      done()
    });
  }
  
  
  fastify.get('/', { preHandler: fetchTodos }, (request, reply) => {
    reply.view('/templates/index.ejs', { filter: null })
  })
  
  fastify.get('/active', { preHandler: fetchTodos }, (request, reply) => {
    reply.locals.todos = reply.locals.todos.filter(todo => !todo.completed)
    reply.view('/templates/index.ejs', { filter: 'active' })
  })
  
  fastify.get('/completed', { preHandler: fetchTodos }, (request, reply) => {
    reply.locals.todos = reply.locals.todos.filter(todo => todo.completed)
    reply.view('/templates/index.ejs', { filter: 'completed' })
  })
  
  fastify.post('/', (request, reply) => {
    db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [
      request.body.title,
      request.body.completed == true ? 1 : null
    ], function(err) {
      if (err) {
        reply.send(err)
        return
      }
      reply.redirect(`/${request.body.filter || ''}`)
    })
  })
  
  fastify.post('/:id(\\d+)', (request, reply) => {
    if (request.body.title !== '') {
      db.run('UPDATE todos SET title = ?, completed = ? WHERE rowid = ?', [
        request.body.title,
        request.body.completed !== undefined ? 1 : null,
        request.params.id
      ], function(err) {
        if (err) {
          reply.send(err)
          return
        }
        reply.redirect(`/${request.body.filter || ''}`)
      })
    } else {
      db.run('DELETE FROM todos WHERE rowid = ?', [
        request.params.id
      ], function(err) {
        if (err) {
          reply.send(err)
          return
        }
        reply.redirect(`/${request.body.filter || ''}`)
      })
    }
  })
}

module.exports = routes
