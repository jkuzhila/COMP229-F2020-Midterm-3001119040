/* File name : index.js  Author's name : James Kuzhilaparambil Student ID: 301119040 Web App name: COMP229-W2020-MidTerm-3001119040 */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
