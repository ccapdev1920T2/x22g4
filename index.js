const express = require('express');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
var path = require('path');

const routes = require('./routes/routes.js');

const database = require('./models/database.js');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials'),

	//Helpers
	helpers: {
		cap: function(text) { return text.toUpperCase(); },
		em: function(text) {
			var x = `<em>${text}</em>`;

			return new handlebars.SafeString(x);
		}
	}
}));

app.set('view engine', 'hbs');
//HBS Init

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

app.use(function(req, res) {
    res.render('404');
});
//Files

database.connect();

app.listen(port, function() {
    console.log('app listening at port ' + port);
});
