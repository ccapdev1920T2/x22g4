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
           //query for the past 7 days
           let dateQuery = new Date();
           dateQuery.setDate(dateQuery.getDate() - 7);

            //get featured post of the week
            Post.findOne({date:{"$gte":dateQuery}})
            .sort('-numberOfMeowts')
            .lean()
            .exec((err, featuredResults) => {
                let featuredPostDetails = {
                    _id: null,
                    imageUrl: null,
                    author: null,
                    postTitle: null,
                    caption: null,
                    display_featured: false
                };

                if (featuredResults != null) {
                    if (featuredResults.numberOfMeowts > 0) {
                        featuredPostDetails = {
                            _id: featuredResults._id,
                            imageUrl: featuredResults.imageUrl,
                            author: featuredResults.author,
                            postTitle: featuredResults.postTitle,
                            caption: featuredResults.caption,
                            display_featured: true
                        };
                    };
                };

                //convert posts to relative format
                for (var i = 0; i<results.length; i++){
                    results[i].date = helper.formatDate(results[i].date);
                };

            
                res.render('cat-feed', { posts: results, catfeed_active: true,

                    //featured post
                    _id: featuredPostDetails._id,
                    imageUrl: featuredPostDetails.imageUrl,
                    author: featuredPostDetails.author,
                    postTitle: featuredPostDetails.postTitle,
                    caption: featuredPostDetails.caption,
                    display_featured: featuredPostDetails.display_featured
                });
            });

    
        })
        

        
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
        post.imageUrl = fileName;

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