const {Router}= require('express');
const router= Router();

const {getIssues,borrowBook,returnBook}=require('../controllers/issueControllers');

router.get('/issues',getIssues);

router.get('/issues/borrowbook/:isbn',borrowBook);

router.put('/issues/returnbook/:isbn',returnBook);

module.exports= router;