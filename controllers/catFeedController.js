const database = require("../models/database.js");
const Post = require("../models/post.js");

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({
    dest: __dirname + "../public",
    limits: {fileSize: (1048576 * 5), files:1}
  });

const catFeedController = {

    getCatFeed: function(req, res) {
        var details;

       Post.find({})
       .lean()
       .exec(function (err, results) {

        for (var i = 0; i<results.length; i++){
              results[i].date = formatDate(results[i].date);
            };
            
            res.render('cat-feed', {posts: results});
         });
    },

    postCatFeed: function(req, res) {

        //create post here
        console.log("hello")

        upload.single("file", (x, y) => {
            const tempPath = req.file.path;
            const targetPath = path.join((__dirname, "./postImgs/test.png"));

            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
        
                res
                  .status(200)
                  .contentType("text/plain")
                  .end("File uploaded!");
              });
        })
    }
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