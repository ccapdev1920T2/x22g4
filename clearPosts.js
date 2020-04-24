const database = require('./models/database.js');
const Post = require('./models/post.js');
const User = require('./models/user.js');
const Comment = require('./models/comment.js');

database.connect();

database.deleteMany(Post, (flag) => {})
database.deleteMany(User, (flag) => {})
database.deleteMany(Comment, (flag) => {})