// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const path = require('path')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public')
})
fastify.register(require('fastify-formbody'))
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
})

fastify.register(require('./db'))

// Declare a route
fastify.register(require('./routes/index'))

// Run the server!
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
