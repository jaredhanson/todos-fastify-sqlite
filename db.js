const fp = require('fastify-plugin')
const sqlite3 = require('sqlite3')
const mkdirp = require('mkdirp')

async function dbConnector (fastify, options) {
  mkdirp.sync('./var/db');
  
  var db = new sqlite3.Database('./var/db/todos.db');
  
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS todos ( \
      id INTEGER PRIMARY KEY, \
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
