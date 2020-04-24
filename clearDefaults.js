const database = require('./models/database.js');
const Post = require('./models/post.js');
const User = require('./models/user.js');
const Comment = require('./models/comment.js');
const Cat = require('./models/cat.js')
const Godparent = require('./models/godparent.js')

database.connect();

database.deleteMany(Post, (flag) => {})
database.deleteMany(User, (flag) => {})
database.deleteMany(Comment, (flag) => {})
database.deleteMany(Cat, (flag) => {})
database.deleteMany(Godparent, (flag) => {})