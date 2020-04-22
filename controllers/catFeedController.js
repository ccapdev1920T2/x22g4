const database = require("../models/database.js");
const Post = require("../models/post.js");
const helper = require("./helper.js");
const fs = require('fs');
const multer = require('multer');


const catFeedController = {

    getCatFeed: function(req, res) {
        var details;

       Post.find({})
       .lean()
       .exec(function (err, results) {

        //convert date to relative format
        for (var i = 0; i<results.length; i++){
              results[i].date = formatDate(results[i].date);
            };
            
            res.render('cat-feed', {posts: results});
         });
    },

    postCatFeed: function(req, res) {
        if (!(req.file)) {
            console.log('did not get image.');
            return;
        }

        const defaultUser = "default";

        var post = new Post({
            author: defaultUser,
            postTitle: req.body.postTitle,
            caption: req.body.caption
        });
    
        var newName = post._id;
        var fileName = renameImage(req, newName);
        post.imageUrl = '/postImgs/' + fileName;

        helper.newPost(post);


        
    }
}

function renameImage(req, newName) {
    var originalName = req.file.originalname;
    var extension = originalName.substring(originalName.lastIndexOf("."));
    const newUrl = req.file.destination + '/' + newName + extension; 
    
    fs.renameSync(req.file.path, newUrl);
    return newName + extension;
}

function formatDate(date) {
    var delta = Math.round((+new Date - date) / 1000);

    var minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    var fuzzy;

    if (delta < 30) {
        fuzzy = 'just then';
    } else if (delta < minute) {
        fuzzy = delta + ' seconds ago';
    } else if (delta < 2 * minute) {
        fuzzy = 'a minute ago.'
    } else if (delta < hour) {
        fuzzy = Math.floor(delta / minute) + ' minutes ago';
    } else if (Math.floor(delta / hour) == 1) {
        fuzzy = '1 hour ago.'
    } else if (delta < day) {
        fuzzy = Math.floor(delta / hour) + ' hours ago';
    } else if (delta < day * 2) {
        fuzzy = 'yesterday';
    }

    return fuzzy;
};
  
module.exports = catFeedController;