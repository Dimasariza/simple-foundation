const users = require('./public/demo/data/chat-inbox.json');
const posts = require('./public/demo/data/task-list.json');

module.exports = () => ({
  users: users,
  posts: posts
});