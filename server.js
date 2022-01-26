// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
})

// Declare a route
fastify.register(require('./routes/index'))

// Run the server!
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
