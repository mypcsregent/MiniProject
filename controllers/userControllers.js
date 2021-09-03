const {Pool}  = require('pg');
const { nextTick } = require('process');

const pool= new Pool({
    host:'localhost',
    user:'rajesh',
    password:'password',
    database:'library',
    port:'5432' 
});



const getUsers=async(req,res)=>{
    const response= await pool.query('select * from users');
    res.status(200).json(response.rows);
}

const createUsers=async(req,res)=>{
    const {username,emailid,password}=req.body;
    const emailidrows=await pool.query('select emailid from users where emailid = $1',[emailid]);
    if(emailidrows.rows.length>0)
    {
        res.status(409).json({
            error:'User Already Exists'
        })
    }
    else{
    const response=await pool.query('Insert into users (username,emailid,password) values ($1,$2,$3)',[username,emailid,password]);
    res.status(200).json({message:"Successfully Created the User"});
    }
}


module.exports={getUsers,createUsers}