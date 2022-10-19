const { expect } = require("chai");
const { response } = require("express");
const request = require("supertest");
const assert = require("chai").assert;
const { app } = require("../app");
const db = require("../models/index");
const { User } = db;
const bcrypt = require("bcrypt");

beforeEach(() => {
  db.sequelize.truncate({ cascade: true });
});

describe("GET /movies", () => {
  it("Should return status 200", (done) => {
    request(app).get("/movies").expect(200).end(done);
  });

  it("Should return json", (done) => {
    request(app)
      .get("/movies")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);
  });

  it("Should return movies", (done) => {
    request(app)
      .get("/movies")
      .expect(200)
      .then((response) => {
        assert.isNotEmpty(response._body);
        assert.isArray(response._body);
        response._body.forEach((movie) =>
          assert.containsAllKeys(movie, [
            "title",
            "description",
            "director",
            "producer",
            "release_date",
            "running_time",
            "rt_score",
          ])
        );
      })
      .then(() => done(), done); // soluciona el problema de  Error: Timeout of 2000ms exceeded.
  });
});

describe("GET /movies/:id", () => {
  it("Get Movie Details By ID", (done) => {
    request(app)
      .get("/movies/58611129-2dbc-4a81-a72f-77ddfc1b1b49")
      .expect(200)
      .then((response) => {
        assert.isNotEmpty(response._body); //no esta vacio
        assert.isNotArray(response._body);
        assert.containsAllKeys(response._body, [
          "title",
          "description",
          "director",
          "producer",
          "release_date",
          "running_time",
          "rt_score",
        ]);
      })
      .then(() => done(), done);
  });
});

describe.only("POST /register", () => {
  const userExample = {
    email: "cristian@gmail.com",
    password: "avalith",
    phone: "555-555-555",
    dni: "43123453",
  };

  it("should return 201", (done) => {
    request(app)
      .post("/register")
      .send(userExample)
      .expect(201)
      .then(() => done(), done);
  });

  it("should user register", (done) => {
    request(app)
      .post("/register")
      .send(userExample)
      .expect(201)
        .then(async (response) => {
          assert.isTrue(response._body.ok)
        assert.isNotEmpty(response._body); //no esta vacio
        assert.isNotArray(response._body);
        assert.containsAllKeys(response._body.usuario, [
          "email",
          "password",
          "phone",
          "dni",
          "createdAt",
          "updatedAt",
        ]);
        const userDB = await User.findOne({
          where: { email: userExample.email },
        });
        assert.exists(userDB);
        assert.isTrue(
          bcrypt.compareSync(
            userExample.password,
            response._body.usuario.password
          )
        );
      })
      .then(() => done(), done);
  });
});

describe("POST /login", () => {
  const userExample = {
    nombre: "Cristian",
    email: "cristian@gmail.com",
    password: "avalith",
    phone: "555-555-555",
    dni: "43123453",
  };

  it("should return 200", (done) => {
    request(app)
      .post("/register")
      .send(userExample)
      .then((user) => {
        request(app)
          .post("/login")
          .send({ email: userExample.email, password: userExample.password })
          .expect(200)
          .then((res) => {
            //checks y aserciones
          })
          .then(() => done(), done);
      });
  });
});

describe("Not Found handling", () => {
  it("Should return status 404", (done) => {
    request(app)
      .get("/")
      .expect(404)
      .then((response) => {
        assert.equal(response.res.statusMessage, "Not Found");
      })
      .then(() => done(), done);
  });
});
