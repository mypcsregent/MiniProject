'use strict';
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { RSA_NO_PADDING } = require("constants");
let server=require("../app");
let should = chai.should();


chai.use(chaiHttp);


describe ("Users APIs", function(){

    var newUsers=[{
        "username":"TestUser",
        "emailid":"TestUser@test.com",
        "password":"Tested121"
    },
    {
        "username":"TestUser2",
        "emailid":"TestUser2@gmail.com"
        //password is missing...
    }]

    it("Should get all users",(done)=>{
        chai.request(server)
                .get("/users/")
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log("No of Responses:", res.body.length);
                    console.log("List of Users:",res.body);
                    done();
                })
        
    })

    it("should show validation error creating user",(done)=>{
        chai.request(server)
                .post("/users/")
                .send(newUsers[1])
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(400);
                done();
                })
        
    })

    it("should create user",(done)=>{
        chai.request(server)
                .post("/users/")
                .send(newUsers[0])
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        
    })

    it("Should show user already exists",(done)=>{
        chai.request(server)
                .post("/users/")
                .send(newUsers[0])
                .end((err,res)=>{
                    should.exist(res);
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    console.log(res.body);
                    done();
                })
    })

})