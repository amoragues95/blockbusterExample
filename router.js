const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MovieController = require('./controllers/MovieController');
const UsersController = require('./controllers/UserController');
const { checkLoggedIn } = require('./middlewares/checks');

router.use(bodyParser.json())
router.get('/movies', MovieController.getMovies);
router.get('/movies/:id', MovieController.getMovieDetails);
router.get('/runtime/:max', MovieController.getMoviesByRuntime)
router.post('/login', UsersController.login)
router.post('/register', UsersController.register)
router.post('/movie', checkLoggedIn, MovieController.addMovie)

module.exports = router;