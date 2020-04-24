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
              results[i].date = helper.formatDate(results[i].date);
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

        res.redirect('/post/' + newName);


        
    }
}

function renameImage(req, newName) {
    var originalName = req.file.originalname;
    var extension = originalName.substring(originalName.lastIndexOf("."));
    const newUrl = req.file.destination + '/' + newName + extension; 
    
    fs.renameSync(req.file.path, newUrl);
    return newName + extension;
}


  
module.exports = catFeedController;