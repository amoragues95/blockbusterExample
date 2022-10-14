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
            assert.containsAllKeys(movie, ["title","description","director","producer","release_date","running_time","rt_score", "pepito"]);
        })
        .then(()=> done(), done) // soluciona el problema de  Error: Timeout of 2000ms exceeded.
    })
})