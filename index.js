const express = require('express');
const hbs = require('hbs');

const routes = require('./routes/routes.js');

const database = require('./models/database.js');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({extended: true}));

var path = require('path');
app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

app.use(function(req, res) {
    res.render('404');
});

database.connect();

app.listen(port, function() {
    console.log('app listening at port ' + port);
});
