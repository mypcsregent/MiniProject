const {Router}= require('express');
const router= Router();

const {userMiddleware}=require('../middleware/userMiddleware');
const {userSchemas}=require('../schemas/userSchema');
const {getUsers,createUsers}=require('../controllers/userControllers');

router.get('/users',getUsers);

router.post('/users',userMiddleware(userSchemas.User,'body'),createUsers);


module.exports= router;