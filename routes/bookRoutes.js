const {Router}= require('express');
const router= Router();

const {authenticateToken}=require('../middleware/userMiddleware');

const {getBooks,getBooksByIsbn}=require('../controllers/bookControllers');

router.get('/books',authenticateToken,getBooks);
router.get('/books/:isbn',authenticateToken,getBooksByIsbn);


module.exports= router;