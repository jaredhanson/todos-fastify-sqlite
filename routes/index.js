async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    const obj = {
      todos: [],
      activeCount: 0,
      completedCount: 0,
      filter: null
    }
    
    reply.view("/templates/index.ejs", obj)
  })
}

module.exports = routes
