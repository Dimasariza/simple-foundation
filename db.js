const fs = require('fs')
const path = require("path");

const message = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/message.json')));
const inbox = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/inbox.json')));
const taskList = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/task-list.json')));
const user = JSON.parse(fs.readFileSync(path.join(__dirname, './public/demo/data/user.json')));

module.exports = {
    message,
    inbox,
    "task-list": taskList,
    user       
}