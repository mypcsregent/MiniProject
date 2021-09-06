'use strict';
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { RSA_NO_PADDING } = require("constants");
let server=require("../app");
let should = chai.should();


chai.use(chaiHttp);



describe("Issues API", function(){

    var borrower=[{
        "emailid":"Harry@gmail.com",
        "password":"Passwordss121*"
    },
    {
        "emailid":"Harry@gmail.com",
        "password":"Passwords21*"
    },
    {
        "emailid":"TestUser4@test.com",
        "password":"Tested121"
    }
]

    before( function(done){
    chai.request(server)
    .get("/issues/borrowbook/B_123")
    .send(borrower[2])
    .end((err,res)=>{
        done();
    })

    })  

    

    it("Successfully Borrow Book",(done)=>{
        chai.request(server)
        .get("/issues/borrowbook/B_121")
        .send(borrower[0])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(200);
            res.body.should.have.a('object');
            done();
        })
        
    })

    it("Borrowing the Book the user already has",(done)=>{
        chai.request(server)
        .get("/issues/borrowbook/B_123")
        .send(borrower[2])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(409);
            res.body.should.have.a('object');
            done();
        })
        
    })

    it("Should get all issues",(done)=>{
        chai.request(server)
                .get("/issues/")
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log("No of Responses:", res.body.length);
                    console.log("List of Issues:",res.body);
                    done();
                })
        
    })

    it("Successfully Return Book",(done)=>{
        chai.request(server)
        .put("/issues/returnbook/B_123")
        .send(borrower[2])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(200);
            res.body.should.have.a('object');
            done();
        })
        
    })

    it("error while returning the wrong Book",(done)=>{
        chai.request(server)
        .put("/issues/returnbook/B_122")
        .send(borrower[2])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(409);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })

    it("Error while Borrowing Book that doesnt exist",(done)=>{
        chai.request(server)
        .get("/issues/borrowbook/B_127")
        .send(borrower[0])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(404);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })


    it("Wrong credentials while Borrowing Book",(done)=>{
        chai.request(server)
        .get("/issues/borrowbook/B_121")
        .send(borrower[1])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(401);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })

    it("Wrong credentials while Returning Book",(done)=>{
        chai.request(server)
        .put("/issues/returnbook/B_121")
        .send(borrower[1])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(401);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })

    it("borrowing an unavailable book",(done)=>{
        chai.request(server)
        .get("/issues/borrowbook/B_124")
        .send(borrower[0])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(410);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })



after(function(done){
    chai.request(server)
        .put("/issues/returnbook/B_121")
        .send(borrower[0])
        .end((err,res)=>{
            done();
        })
})


})
