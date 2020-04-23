//Express
const express = require('express');

//Handlebars
const hbs = require('hbs');
const exphbs = require('express-handlebars');	

var path = require('path');

//Express-Session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);   

//Cookie & Morgan & Sequelize & Body Parser
const cookieParser = require('cookie-parser');
//const morgan = require('morgan');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

//Connect Models
const routes = require('./routes/routes.js');
const database = require('./models/database.js');

//Init Applications
const app = express();
const port = 3000;

//Dev~ Guys @Justin, @Mich you can turn this off if the cmd is noisy !!
//app.use(morgan('dev')); 

/*

//Init Session
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
	key: 'user_sid', //user session id
    secret: 'arthaland',
    resave: false,
    saveUninitialized: true,
    store: database.sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 Day.
    }
}));

app.use((req, res, next) => {
	if(req.cookies.user_sid && !req.session.user) {
		res.clearCookie('user_sid');
	}
	next();
});

//If active session
var sessionChecker = (req, res, next) => {
	if(req.session.user && req.cookies.user_sid) {
		res.render('index', {
			active_session: true,
			active_user: req.session.user
		})
	} else {
		next();
	}
};

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

*/

//Session

//Init HBS
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

//Handlebars Init
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
