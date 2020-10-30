/* File name : routes/books.js  Author's name : James Kuzhilaparambil Student ID: 301119040 Web App name: COMP229-W2020-MidTerm-3001119040 */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => 
{

    /*****************
     * ADD CODE HERE *
     *****************/
    module.exports.displayAddPage = (req, res, next) => 
    {
      res.render('../books/details.ejs', {title: 'Add Book', 
      displayName: req.user ? req.user.displayName : ''})          
    }

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => 
{

    /*****************
     * ADD CODE HERE *
     *****************/
    module.exports.processAddPage = (req, res, next) =>
{
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create
    (newBook, (err, Book) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    }
    );

}


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    module.exports.displayEditPage = (req, res, next) => {
      let id = req.params.id;
  
      Book.findById(id, (err, bookToEdit) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              //show the edit view
              res.render('../books/details.ejs', {title: 'Edit Book', book: bookToEdit, 
              displayName: req.user ? req.user.displayName : ''})
          }
      });
  }
  
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    module.exports.processEditPage = (req, res, next) => {
      let id = req.params.id
  
      let updatedBook = Book({
          "_id": id,
          "name": req.body.name,
          "author": req.body.author,
          "published": req.body.published,
          "description": req.body.description,
          "price": req.body.price
      });
  
      Book.updateOne({_id: id}, updatedBook, (err) => {
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              // refresh the book list
              res.redirect('/books');
          }
      });
  }

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    module.exports.performDelete = (req, res, next) => {
        let id = req.params.id;
    
        Book.remove({_id: id}, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                 // refresh the book list
                 res.redirect('/books');
            }
        });
    }
});


module.exports = router;
