const express = require('express');
const movies = require('../models').Movies;

const getMovies = async (req, res) => {
    let order;

    if (req.query.sort) {
        req.query.sort = req.query.sort.toUpperCase();
    }

    order = req.query.sort === 'DESC' ? req.query.sort : 'ASC';


    try {
        let moviesList = await movies.findAll({
            attributes: ['title', 'description', 'director', 'producer', 'release_date', 'running_time', 'rt_score'],
            order: [['rt_score', order]]
        }
        )
        res.json(moviesList);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getMovies,
}