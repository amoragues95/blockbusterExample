const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const GHIBLI_APP = "https://ghibliapi.herokuapp.com/films/";
const db = require("../models/index");
const { Movie } = db;

async function getFilmFromAPIByName(name) {
  let films = await fetch("https://ghibliapi.herokuapp.com/films");
  films = await films.json();
  return films.find((film) => film.title.includes(name));
}

const getMovies = async (req, res) => {
  console.log("Movies");
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  res.status(200).send(movies);
};

const getMoviesByRuntime = async (req, res) => {
  const maxRuntime = req.params.max;
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  if (maxRuntime < 137)
    movies = movies.filter((movie) => movie.running_time <= maxRuntime);
  res.status(200).send(movies);
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  const movie = movies.find((movie) => movie.id === id);
  res.status(200).send(movie);
};

const addMovie = (req, res, next) => {
  const movie = getFilmFromAPIByName(req.body.title);
  const newMovie = {
    code: movie.id,
    title: movie.title,
    stock: 5,
    rentals: 0,
  };
  Movie.create(newMovie)
    .then((movie) => res.status(201).send("Movie Stocked"))
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  getMovieDetails,
  getMoviesByRuntime,
  addMovie,
};
