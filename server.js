const path = require("path")
const jsonServer  = require('json-server')
const server      = jsonServer.create()
// const router      = jsonServer.router(require('./db.json')())
const fs = require('fs')
const db = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/db.json')))
const router      = jsonServer.router(db)
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