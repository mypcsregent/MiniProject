const {Pool}  = require('pg');

const pool= new Pool({
    host:'localhost',
    user:'rajesh',
    password:'password',
    database:'library',
    port:'5432' 
});




const getBooks=async(req,res)=>{
    const response= await pool.query('select * from books');
    res.status(200).json(response.rows);
}


const getBooksByIsbn=async(req,res)=>{
    const isbn=req.params.isbn;
    const response= await pool.query('select * from books where isbn = $1',[isbn]);
    if(response.rows.length==0){
        res.status(404).json(`No books by the isbn= ${isbn}`);
    }
    res.status(200).json(response.rows);
}

module.exports={getBooks,getBooksByIsbn}