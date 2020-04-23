const database = require('./models/database.js')
const helper = require('./controllers/helper')
const Comment = require('./models/comment.js')

database.connect();

let comment = new Comment({
    author: 'default',
    text: 'test comment'
})

helper.insertComment('5ea16bca6022cb1044c8a650', comment);
