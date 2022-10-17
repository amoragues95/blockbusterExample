const { expect } = require('chai');
const { response } = require('express');
const request = require('supertest');
const assert = require('chai').assert;
const { app } = require('../app');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



beforeEach(() => {
    db.sequelize.truncate({ cascade: true })
});

describe('GET /movies', () => {

    it('Should return status 200', done => {
        request(app)
            .get('/movies')
            .expect(200)
            .end(done)
    });

    it('Should return json', done => {

        request(app)
            .get('/movies')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    });

    it('Should return movies', done => {
        request(app)
            .get('/movies')
            .expect(200)
            .then(response => {
                assert.isNotEmpty(response._body);
                assert.isArray(response._body);
                response._body.forEach(movie => assert.containsAllKeys(movie, ["title", "description", "director", "producer", "release_date", "running_time", "rt_score"]))
            })
            .then(() => done(), done) // soluciona el problema de  Error: Timeout of 2000ms exceeded.
    })
})

describe('POST /register', () => {
    const userExample = {
        "nombre": "Cristian",
        "email": "cristian@gmail.com",
        "password": "avalith",
        "phone": "555-555-555",
        "dni": "43123453"
    }

    it('should return 201', done => {
        request(app)
            .post('/register')
            .send(userExample)
            .expect(201)
            .end(done)
    })
})

describe('POST /login', () => {
    const userExample = {
        "nombre": "Cristian",
        "email": "cristian@gmail.com",
        "password": "avalith",
        "phone": "555-555-555",
        "dni": "43123453"
    }

    it('should return 200', done => {
        request(app)
            .post('/register')
            .send(userExample)
            .then(user => {
                request(app)
                    .post('/login')
                    .send({ email: userExample.email, password: userExample.password })
                    .expect(200)
                    .then(res => {
                        assert.isNotEmpty(res.body);
                        expect(res.type).to.equal('application/json');
                        expect(res.body.token).to.be.a('string')
                        expect(bcrypt.compareSync(userExample.password, res.body.usuario.password)).to.be.true
                        const payload = jwt.decode(res.body.token)

                        // Convierte los valores de los objetos en un array y los compara individualmente en el expect 
                        const userPayloadIterable = Object.values(payload.usuario)
                        const userResIterable = Object.values(res.body.usuario)
                        expect(userResIterable).to.have.deep.members(userPayloadIterable)
                        expect(res.body.ok).to.be.true

                    }).then(() => done(), done)
            })
    })
})

describe('Not Found handling', () => {
    it('Should return status 404', done => {
        request(app)
            .get('/')
            .expect(404)
            .then(response => {
                assert.equal(response.res.statusMessage, 'Not Found')
            }).then(() => done(), done)
    })
})