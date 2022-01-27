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
  defaultContext: {
    pluralize: require('pluralize')
  }
})

fastify.register(require('./db'))

fastify.register(require('./routes/index'))

fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
