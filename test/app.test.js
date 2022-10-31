const { expect } = require("chai");
const { response } = require("express");
const request = require("supertest");
const assert = require("chai").assert;
const { app } = require("../app");
const db = require("../models/index");
const { User } = db;
const bcrypt = require("bcrypt");
const { BaseError } = require("sequelize");

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

describe("POST /register", () => {
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

  it("Should not allowed user to register twice", done => {
    //TO-DO
    //Check that repeated user doesnt persist
  })
});

describe("POST /login", () => {
  const userExample = {
    nombre: "Cristian",
    email: "cristian@gmail.com",
    password: "avalith",
    phone: "555-555-555",
    dni: "43123453",
  };

  it("should return 200 and a token", (done) => {
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

describe('POST /favourite/:code', () => {
  beforeEach(done => {
    //Crear usuario y pelicula
  })
  it("Should return 201 and set movie as favourite for logged user with review", done => {
    // TO-DO
    // Check status
    // Check si se registro el cambio en la DB
    // Check si el registro en la DB es correcto
  })
  it("Should return 201 and set movie as favourite for logged user without review", done => {
    // TO-DO
    // Check status
    // Check si se registro el cambio en la DB
    // Check si el registro en la DB es correcto
  })
  it("Should not allow to favourite the same movie twice", done => {
    //TO-DO, llamar al endpoint con la misma peli 2 veces
    // Check error status
    // Check error message
    // Check db que no se haya persistido un registro
  })
})

describe('GET /favourites', () => {
  beforeEach(done => {
    // Crear usuario, pelicula y agregar favoritos
  })
  it("Should return 200 status and logged user favourite list", done => {
    // TO-DO
    // checkear que sea un array 
    // checkear que tenga la cantidad correcta de elementos
    // checkear las clave de cada elemento
    // checkear que los elementos sean/sea el/los correctos
  })
  it("Should forbid access to non logged user", done => {
    //TO-DO
    //Chequear status
    //Chequear mensaje de error
  })
})

describe('POST /rent/:code', () => {
  beforeEach(done => {
    // Crear usuario, pelicula
    })
    it("Should return 201 and successfully rent a movie", done => {
      //TO_DO
      //Check status
      //Chequear si se persistio correctamente la reserva
      //Chequear que se quito una peli de stock
      //Chequear que se sumo la renta a las veces alquiladas
    })
    it("Should not allow rent if there is no stock", done => {
      //TO-DO
    })
    it("Should not allow rent if movie does not exist", done => {
      //TO-DO
    })
    it("Should not allow non logged user to rent a movie", done => {
      //TO-DO
    })
  })

describe("POST /return/:code", done => {
  beforeEach(done => {
    // Crear usuario, pelicula, y rentas, una vencida y una sin vencer
  })
  it("Should return a rental on time", done => {
    //TO-DO
    //Chequear status code 200
    //Chequear que se devuelva correctamente el precio
    //Chequear que se restockee correctamente la pelicula
    //Chequear que se persitio la fecha de devolucion
  })
  it("Should return late rental", done => {
    //TO-DO
    //Chequear status code 200
    //Chequear que se devuelva correctamente el precio con el agregado
    //Chequear que se restockee correctamente la pelicula
    //Chequear que se persitio la fecha de devolucion
  })
  it("Should return a movie that was rented a second time", done => {
    //TO-DO
  })
  it("Should not allow to rent movie twice simultaneously", done => {
    //TO-DO
  })
  it("Should not allow to return already returned movie", done => {
    //TO-DO
  })
  it("Should not allow to return non rented movie", done => {
    //TO-DO
  })
  it("Should not allow non logged user to return a movie", done => {
    //TO-DO
  })
})

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
