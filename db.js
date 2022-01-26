const fp = require('fastify-plugin')
const sqlite3 = require('sqlite3')

async function dbConnector (fastify, options) {
  var db = new sqlite3.Database('todos.db');
  
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS todos ( \
      title TEXT NOT NULL, \
      completed INTEGER \
    )");
  });
  
  
  const sqlite = {
  }
  sqlite.db = db
  
  fastify.decorate('sqlite', sqlite)
}

module.exports = fp(dbConnector)
