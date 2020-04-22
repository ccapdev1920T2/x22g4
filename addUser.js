const database = require('./models/database.js');
const User = require('./models/user.js');

database.connect();

var user2 = new User({
    username: 'default',
    password: 'Password1',
    description: 'default'
});

database.insertOne(User, user2, function (param) {
    console.log(param)
  });
