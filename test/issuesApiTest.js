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
    }]

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
        .put("/issues/returnbook/B_121")
        .send(borrower[0])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(200);
            res.body.should.have.a('object');
            done();
        })
        
    })

    it("error while returning the wrong Book",(done)=>{
        chai.request(server)
        .put("/issues/returnbook/B_121")
        .send(borrower[0])
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
        .get("/issues/borrowbook/B_126")
        .send(borrower[0])
        .end((err,res)=>{
            should.exist(res);
            res.should.have.status(404);
            res.body.should.have.a('object');
            console.log(res.body);
            done();
        })
        
    })


})
