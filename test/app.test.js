const { response } = require('express');
const request = require('supertest');
const assert = require('chai').assert;
const {app} = require('../app');

describe('GET /movies', ()=>{

    it('Should return status 200', done =>{
        request(app)
        .get('/movies')
        .expect(200)
        .end(done)
    });

    it('Should return json', done =>{

        request(app)
        .get('/movies')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    });

    it('Should return movies', done =>{
        request(app)
        .get('/movies')
        .expect(200)
        .then(response => {
            assert.isNotEmpty(response);
            assert.isArray(response._body);
            const movie = response._body[0]
            assert.containsAllKeys(movie, ["title","description","director","producer","release_date","running_time","rt_score"]);
        })
            .then(() => done(), done) // soluciona el problema de  Error: Timeout of 2000ms exceeded.
        
    })
})

describe.only('GET /movies/:id', () => {
    it('Get Movie Details By ID', done => {
        request(app)
            .get('/movies/58611129-2dbc-4a81-a72f-77ddfc1b1b49')
            .expect(200)
            .then(response => {
                assert.isNotEmpty(response._body)//no esta vacio
                assert.isNotArray(response._body)
                assert.containsAllKeys(response._body, ["title","description","director","producer","release_date","running_time","rt_score"])
            }).then(() => done(), done)
    })
})