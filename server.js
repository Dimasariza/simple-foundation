const jsonServer  = require('json-server')
const server      = jsonServer.create()
// const router      = jsonServer.router(require('./db.json')())
const router      = jsonServer.router('/public/demo/data/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(
	// Add custom route here if needed
	jsonServer.rewriter({
		"/api/*": "/$1",
	})
);
server.use(router)
server.listen(3001, function () {
    console.log('JSON Server is running')
})

module.exports = server;