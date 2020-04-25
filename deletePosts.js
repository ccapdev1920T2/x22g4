const database = require('./models/database.js');
const Post = require('./models/post.js');
const Comment = require('./models/comment.js');
const fs = require('fs');
const path = require('path');

const directory = './public/postImgs/';

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

database.connect();

database.deleteMany(Post, (flag) => {})
database.deleteMany(Comment, (flag) => {})
