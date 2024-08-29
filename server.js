const path = require("path");
const fs = require('fs');
const jsonServer  = require('json-server');
const server      = jsonServer.create();
// const db = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/db.json')));
// const router      = jsonServer.router(db);
const router      = jsonServer.router(require('./db.js'))
const middlewares = jsonServer.defaults();

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