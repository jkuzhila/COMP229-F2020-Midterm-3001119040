/* File name : models/books.js  Author's name : James Kuzhilaparambil Student ID: 301119040 Web App name: COMP229-W2020-MidTerm-3001119040 */
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
