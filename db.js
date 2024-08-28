const message = require('./public/demo/data/message.json');
const inbox = require('./public/demo/data/inbox.json');
const taskList = require('./public/demo/data/task-list.json');
const user = require('./public/demo/data/user.json');

module.exports = function() {
    return {
        message,
        inbox,
        taskList,
        user       
    }
}