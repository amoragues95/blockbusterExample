const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const GHIBLI_APP = 'https://ghibliapi.herokuapp.com/films/'
const db = require('../models/index')
const { Movie, FavouriteFilms } = db;
// JsonWebToken
const jwt = require("jsonwebtoken");

async function getFilmFromAPIByName(name) {
    let films = await fetch('https://ghibliapi.herokuapp.com/films')
    films = await films.json();
    return films.find(film => film.title.includes(name))
}

const getMovies = async (req, res) => {
    console.log('Movies');
    let movies = await fetch('https://ghibliapi.herokuapp.com/films');
    movies = await movies.json()
    movies = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.producer,
        running_time: movie.running_time,
        rt_score: movie.rt_score
    }));
    res.status(200).send(movies);
}

const getMoviesByRuntime = async (req, res) => {
    const maxRuntime = req.params.max
    let movies = await fetch('https://ghibliapi.herokuapp.com/films');
    movies = await movies.json()
    movies = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.producer,
        running_time: movie.running_time,
        rt_score: movie.rt_score
    }));
    if (maxRuntime < 137) movies = movies.filter(movie => movie.running_time <= maxRuntime)
    res.status(200).send(movies);
}

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    let movies = await fetch('https://ghibliapi.herokuapp.com/films');
    movies = await movies.json()
    movies = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.producer,
        running_time: movie.running_time,
        rt_score: movie.rt_score
    }));
    const movie = movies.find(movie => movie.id === id)
    res.status(200).send(movie);
}

const addMovie = (req, res, next) => {
    const movie = getFilmFromAPIByName(req.body.title)
    const newMovie = {
        code: movie.id,
        title: movie.title,
        stock: 5,
        rentals: 0
    }
    Movie.create(newMovie)
        .then(movie => res.status(201).send("Movie Stocked"))
        .catch(err => next(err))
}

const addFavourite = async (req, res, next) => {
    try {
        const code = req.params.code;
        const { review } = req.body;

        Movie.findOne({ where: { code: code } }).then(film => {
            if (!film) throw new Error(' Pelicula no disponible ')

            const newFavouriteFilms = {
                MovieCode: film.code,
                UserId: req.user.id,
                review: review,
            };

            FavouriteFilms.create(newFavouriteFilms).then(newFav => {
                if (!newFav) throw new Error('FAILED to add favorite movie')

                res.status(201).send("Movie Added to Favorites");
            });
        });
    } catch (error) {
        error => next(error);
    }
}

const allFavouritesMovies = async (req, res, next) => {

    const allFilms = await FavouriteFilms.findAll({ where: { UserId: req.user.id } })

    const filmReduced = allFilms.map(film => {

        if (film.review != null) {
            return film
        } else {
            return {
                id: film.id,
                MovieCode: film.MovieCode,
                UserId: film.UserId
            }
        }
    })
    res.status(200).json(filmReduced);

}

module.exports = {
    getMovies,
    getMovieDetails,
    getMoviesByRuntime,
    addMovie,
    addFavourite,
    allFavouritesMovies

}