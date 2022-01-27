async function routes (fastify, options) {
  var db = fastify.sqlite.db
  
  function fetchTodos(request, reply, done) {
    db.all('SELECT rowid AS id, * FROM todos', [], function(err, rows) {
      if (err) { return next(err); }
    
      var todos = rows.map(row => {
        return {
          id: row.id,
          title: row.title,
          completed: row.completed == 1 ? true : false,
          url: '/' + row.id
        }
      })
      var activeCount = todos.filter(function(todo) { return !todo.completed; }).length
      var completedCount = todos.length - activeCount
      
      reply.locals = {
        todos: todos,
        activeCount: activeCount,
        completedCount: completedCount,
        pluralize: require('pluralize')
      }
      done();
    });
  }
  
  
  fastify.get('/', { preHandler: fetchTodos }, (request, reply) => {
    reply.view('/templates/index.ejs', { filter: null })
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
}

module.exports = routes
