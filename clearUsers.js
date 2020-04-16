const database = require('./models/database.js');
const User = require('./models/user.js');

database.connect();
database.deleteMany(User, function(flag) {});