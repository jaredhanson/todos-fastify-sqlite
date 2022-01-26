async function routes (fastify, options) {
  fastify.get('/', (request, reply) => {
    const data = {
      todos: [],
      activeCount: 0,
      completedCount: 0,
      filter: null
    }
    
    reply.view('/templates/index.ejs', data)
  })
}

module.exports = routes
