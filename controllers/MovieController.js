const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const GHIBLI_APP = 'https://ghibliapi.herokuapp.com/films/'
const db = require('../models/index')
const { Movie, User, FavouriteFilms } = db;
// JsonWebToken
const jwt = require("jsonwebtoken");

async function getFilmFromAPIByName(name){    
    let films = await fetch('https://ghibliapi.herokuapp.com/films')
    films = await films.json();
    return films.find(film => film.title.includes(name))
}

const getMovies = async(req, res)=>{
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

const getMoviesByRuntime = async(req, res)=>{
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
    if(maxRuntime < 137) movies = movies.filter(movie => movie.running_time <= maxRuntime)
    res.status(200).send(movies);
}

const getMovieDetails = async(req, res) => {
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
        const {review} = req.body;

    //TODO: check body review middleware?¡

        let movie = await fetch(`https://ghibliapi.herokuapp.com/films/${code}`);
        movie = await movie.json();
    
    //Obtener el token, cortarlo y decodificarlo completo.
        const token = req.headers.authorization.split(" ")[1]; //para agarrar el bearer token
        let decoded = jwt.decode(token, { complete: true }); //decodificar el token de manera completa

    //Insertar en la Base de datos la pelicula.code obtenida y el usuario.id que esta logeado y en caso de que haya review agregarla
        // console.log(movie.id);
        // console.log(decoded.payload.usuario.id);
        // console.log(review);

        const newFavouriteFilms = {
            MovieCode: movie.id,
            UserId: decoded.payload.usuario.id,
            review: review,
        };
        
        FavouriteFilms.create(newFavouriteFilms);

        res.status(201).send("Movie Added to Favorites");
    } catch (error) {
        error => next(error);
    }
}

module.exports = {
    getMovies,
    getMovieDetails,
    getMoviesByRuntime,
    addMovie,
    addFavourite
}