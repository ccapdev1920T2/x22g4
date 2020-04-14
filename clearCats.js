const database = require('./models/database.js');
const Cat = require('./models/cat.js');

database.connect();
database.deleteMany(Cat, function(flag) {});