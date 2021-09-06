const {Router}= require('express');
const router= Router();

const {getIssues,borrowBook,returnBook}=require('../controllers/issueControllers');
const { authenticateToken } = require('../middleware/userMiddleware');

router.get('/issues',authenticateToken,getIssues);

router.get('/issues/borrowbook/:isbn',authenticateToken,borrowBook);

router.put('/issues/returnbook/:isbn',authenticateToken,returnBook);

module.exports= router;