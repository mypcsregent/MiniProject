const {Router}= require('express');
const router= Router();

const {userMiddleware,authenticateToken}=require('../middleware/userMiddleware');
const {userSchemas}=require('../schemas/userSchema');
const {getUsers,createUsers,login}=require('../controllers/userControllers');

router.get('/users',getUsers);

router.post('/users',userMiddleware(userSchemas.User,'body'),createUsers);

router.post('/users/login',login);


module.exports= router;