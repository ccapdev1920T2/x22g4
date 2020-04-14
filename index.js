//Imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

//Application Init
const app = express();
const port = 9090;

//HBS Init
app.set('view engine', 'hbs');

//Engine Init
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, 'views/partials'),

	//Helpers
	helpers: {
		cap: function(text) { return text.toUpperCase(); },
		em: function(text) {
			var x = `<em>${text}</em>`;

			return new handlebars.SafeString(x);
		}
	}
}));

//HBS Init
app.set('view engine', 'hbs');
//HBS Init

//Home Route
app.get('/', function(req, res){
    res.render('index', {
    	title: 'Home',
        home_active: true,
    })  
});

app.get('/home(page)?(.html)?', function(req, res) {
    res.render('index', {
        title: 'Home',
        home_active: true,
    })
});
//Home Route

//Feed Route
app.get('/feed', function(req, res){
    res.render('feed', {
    	title: 'Cats',
        explore_active: true,
        adopt_active: true,

        manila: [
            {
                manila_cat: 'MCat#1',
            },
            {
                manila_cat: 'MCat#2',
            },
        ],

        laguna: [
            {
                laguna_cat: 'LCat#1',
            },
            {
                laguna_cat: 'LCat#2',
            },
        ],
    })  
});
//Feed Route

//Cat-Feed
app.get('/cat-feed', function(req, res){
    res.render('cat-feed', {
    	title: 'Cat Feed',
        explore_active: true,
        catfeed_active: true,

        post: [
            {
                post_title: 'Post Sample #1',
                post_author: 'sampleauthor', 
                post_content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                post_latest_liked: 'samplelatestlikeduser',
                post_user: 'sampleotheruser',
                post_user_comment: 'Looks Good to Me! (LGTM!)',
                time: '3 mins',
            },
            {
                post_title: 'Post Sample #2',
                post_author: 'sampleauthor2', 
                post_content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                post_latest_liked: 'samplelatestlikeduser2',
                post_user: 'sampleotheruser2',
                post_user_comment: 'Looks HORRIBLE to Me! (LHTM!)',
                time: '6 mins',
            },
        ]
    })  
});
//Cat-Feed

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        title: 'Donate',
    })  
});
//Donate-Feed


//Files
app.get('/sign-up', function(req, res){
    res.sendFile('views/sign-up.html', {root: __dirname});
});

app.get('/log-in', function(req, res){
    res.sendFile('views/log-in.html', {root: __dirname});
});

app.get('/user/userName', function(req, res){
    var userName = req.params.username;
    res.sendFile('views/user-profile.html', {root: __dirname});
});

app.get('cat/catName', function(req, res){
    var catName = req.params.username;
    res.sendFile('views/cat-profile.html', {root: __dirname});
});
//Files

//Show Port
app.listen(port, function(){
    console.log("Listening at port " + port);
})

//Static URL
app.use(express.static(__dirname));
