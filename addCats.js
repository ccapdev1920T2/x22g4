const database = require('./models/database.js');
const Cat = require('./models/cat.js');

/*
    TODO:
        
        1. Create a 'catImgs' folder within the 'public' folder
        2. Put cat profile pictures there. Follow the naming convention: <cat name>Img
        3. You can either download new images, or rename and move the original images that the cats use in an older version to the 'catImgs' folder

        4. Create a 'cat' using the template provided below. 
        5. Then insert that created 'Cat' onto the database using the function "database.insertOne(Cat, cat)"
        6. Repeat steps 4 and 5 as necessary.
*/


var cat = {
    name: '',
    age: '',
    imageUrl: './public/catImgs/<filename>',
    gender: '',
    shortDescription: '',
    yourCatDescription: '',
    pusaThoughts: '',
    notableQuotes: '',
    adoptionStatus: '',
    godParents: null,      //naturally empty for now
    location: ''
};

database.insertOne(Cat, cat, null);

//make more 'cat's and insert them accordingly