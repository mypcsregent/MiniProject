const {Router}= require('express');
const router= Router();

const {getBooks,getBooksByIsbn}=require('../controllers/bookControllers');

router.get('/books',getBooks);
router.get('/books/:isbn',getBooksByIsbn);


module.exports= router;