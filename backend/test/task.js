const chai = require("chai");
const chaiHttp = require("chai-http");
const { json } = require("express");
const server = require("../app.js");

chai.use(chaiHttp);
chai.should();
describe("tasks api", () => {
  describe("Get home api", () => {
    it("IT should get the home api", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          // console.log(response);
          done();
        });
    });
  });
  describe("Login UP a USER", () => {
    it("IT should Login a user", (done1) => {
      const obj = {
        username: "xyz12@",
        password: "xyz12@",
      };
      chai
        .request(server)
        .post("/users/login")
        .send(obj)
        .end((err, response) => {
          //   response.should.have.status(200);
          response.body.should.have.property("success").eq(true);
          response.body.should.have.property("status").eq("Login Successful!");
          console.log(response.body);
          describe("checking for cart", () => {
            it("IT should bring user's cart", (done) => {
              chai
                .request(server)
                .get("/cart")
                .set("Authorization", "Bearer " + response.body.token)
                .end((err, response) => {
                  response.should.have.status(200);
                  done();
                });
            });
          });
          describe("checking for Favourite", () => {
            it("IT should bring user's favourites", (done) => {
              chai
                .request(server)
                .get("/favorites")
                .set("Authorization", "Bearer " + response.body.token)
                .end((err, response) => {
                  response.should.have.status(200);
                  done();
                });
            });
          });
          done1();
        });
    }).timeout(15000);
    describe("Get dishes api", () => {
      it("IT should get the dishes api", (done) => {
        chai
          .request(server)
          .get("/dishes")
          .end((err, response) => {
            response.should.have.status(200);
            // console.log(response);
            done();
          });
      });
    });
    describe("Get promotions api", () => {
      it("IT should get the promotions api", (done) => {
        chai
          .request(server)
          .get("/promotions")
          .end((err, response) => {
            response.should.have.status(200);
            // console.log(response);
            done();
          });
      });
    });
    describe("Get leader api", () => {
      it("IT should get the leaders api", (done) => {
        chai
          .request(server)
          .get("/leaders")
          .end((err, response) => {
            response.should.have.status(200);
            // console.log(response);
            done();
          });
      });
    });
    describe("Get comments api", () => {
      it("IT should get the comments api", (done) => {
        chai
          .request(server)
          .get("/comments")
          .end((err, response) => {
            response.should.have.status(200);
            // console.log(response);
            done();
          });
      });
    });
  });
});
