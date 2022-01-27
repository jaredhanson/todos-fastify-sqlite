# Fastify • [TodoMVC](http://todomvc.com)

> Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture, inspired by Hapi and Express.

&ndash; _[Fastify](https://www.fastify.io/)_

## Resources

- [Website](https://www.fastify.io/)
- [Reference documentation](https://www.fastify.io/docs/latest/Reference/)

### Support

- [Help](https://github.com/fastify/help)

*Let us [know](https://github.com/jaredhanson/todos-fastify-sqlite/issues) if you discover anything worth sharing.*


## Implementation

In contrast to a typical [TodoMVC](https://todomvc.com) app, this app does not
utilize a frontend JavaScript framework or make use of client-side capabilities
such as `localStorage`.  Instead, it illustrates how to build a todo app using
a backend for application logic and persistence, along with HTML forms for
interaction.

This app illustrates how to build a todo app using [Node.js](https://nodejs.org/)
along with the [Fastify](https://www.fastify.io/) web framework.  Data is
persisted to a [SQLite](https://www.sqlite.org/) database.

[EJS](https://ejs.co/) templates are used to generate HTML, which is styled
using vanilla CSS.  HTML forms are used to modify data, rather than an HTTP
API.  That being said, the forms serialize data in a format inspired by
[Todo-Backend](https://todobackend.com/).

To run this app, clone the repository and install dependencies:

```bash
$ git clone https://github.com/jaredhanson/todos-fastify-sqlite.git
$ cd todos-fastify-sqlite
$ npm install
```

Then start the server:

```
$ node server.js
```

Navigate to [`http://localhost:3000`](http://localhost:3000).

## Credit

Created by [Jared Hanson](https://www.jaredhanson.me/)
