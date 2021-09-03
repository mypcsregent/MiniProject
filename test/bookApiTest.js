'use strict';
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { RSA_NO_PADDING } = require("constants");
let server=require("../app");
let should = chai.should();


chai.use(chaiHttp);


describe ("Book APIs",function(){

    it("Should get all books",(done)=>{
        chai.request(server)
                .get("/books/")
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log("No of Responses:", res.body.length);
                    console.log("List of Books:",res.body);
                    done();
                })
        
    })
    
    it("Should get book by id",(done)=>{
        chai.request(server)
                .get("/books/"+"B_121")
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.equal(1)
                    console.log("No of Responses:", res.body.length);
                    console.log("List of Books:",res.body);
                    done();
                })
        
    })
    it("Should not get book by id",(done)=>{
        chai.request(server)
                .get("/books/"+"121")
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(404);
                    res.body.should.equal("No books by the isbn= 121");
                    console.log("Response:",res.body);
                    done();
                })
        
    })
})