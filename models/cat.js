var mongoose = require('mongoose');

const DEFAULT_DESC = 'No info yet!';

var CatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    imageUrl: {
        type: String,
        unique: true
    },
    gender: {
        type: String
    },
    shortDescription: {
        type: String,
        default: DEFAULT_DESC
    },
    yourCatDescription: {
        type: String,
        default: DEFAULT_DESC
    },
    pusaThoughts: {
        type: String,
        default: DEFAULT_DESC
    },
    notableQuotes: {
        type: String,
        default: DEFAULT_DESC
    },
    adoptionStatus: {
        type: String,
        required: true 
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cat', CatSchema);