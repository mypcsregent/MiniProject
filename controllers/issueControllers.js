const {Pool}  = require('pg');
const { nextTick } = require('process');

const pool= new Pool({
    host:'localhost',
    user:'rajesh',
    password:'password',
    database:'library',
    port:'5432' 
});


const getIssues=async(req,res)=>{

    const response=await pool.query('select * from issuebooks');

    res.status(200).json({rows:response.rows});
}


const borrowBook=async(req,res)=>{
    const isbn=req.params.isbn;
    const{emailid,password}=req.user;
    const Matched=await pool.query('select emailid from users where emailid = $1 AND password = $2',[emailid,password]);
    if(Matched.rows.length===0){
        res.status(401).json ({Error:"Wrong Credentials"});  
    }
    else{
        console.log({Message:"Credentials Matched" });
        const Book=await pool.query('select available_count from books where isbn= $1',[isbn]);
        if(Book.rows.length){
            Available=Book.rows[0].available_count;
            console.log(Available);
            if(Available)
            {
                const AlreadyIssued=await pool.query('select * from issuebooks where isbn= $1 And emailid=$2',[isbn,emailid]);
                if(AlreadyIssued.rows.length){
                    res.status(409).json({error:`${emailid} already has a copy of book(isbn: ${isbn})`}); //this has to be tested
                }
                else{
                const date=new Date();
                const issueResponse=await pool.query('insert into issuebooks(isbn,emailid,"createdAt") values ($1,$2,$3)',[isbn,emailid,date]);
                const booksUpdateResponse= await pool.query('update books set available_count=available_count-1 where isbn= $1',[isbn]);
                res.status(200).json({
                        isbn:isbn,
                        emailid:emailid,
                        createdAt:date
                });
            }
            }
            else{
                res.status(410).json({error:"Book is unavailable right now"});  //this has to be tested
            }
        }
        else{
            res.status(404).json({error:`isbn ${isbn} doesnt exist`})
        }

    }
}

const returnBook=async(req,res)=>{
    const isbn=req.params.isbn;
    const{emailid,password}=req.user;
    const Matched=await pool.query('select emailid from users where emailid = $1 AND password = $2',[emailid,password]);
    if(Matched.rows.length===0){
        res.status(401).json ({Error:"Wrong Credentials"}); 
    }
    else
    {
        console.log({Message:"Credentials Matched" });
        const correctIsbn=await pool.query('select isbn from issuebooks where emailid = $1 and isbn = $2',[emailid,isbn]);
        if(correctIsbn.rows.length){

            const updatedAt=await pool.query('delete from issuebooks where emailid=$1 and isbn=$2',[emailid,isbn]);
            const booksUpdateResponse= await pool.query('update books set available_count=available_count+1 where isbn= $1',[isbn]);
            res.status(200).json({message:"Returned the book successfully",emailid:emailid,isbn:isbn});
        }
        else{
            res.status(409).json({error:`This book (isbn: ${isbn}) was not issued to you, maybe the isbn entered is wrong!`});
        }
    }
}

module.exports={getIssues,borrowBook,returnBook};
