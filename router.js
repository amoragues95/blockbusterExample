const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MovieController = require('./controllers/MovieController');
const UsersController = require('./controllers/UserController');
const { checkLoggedIn, checkLoggedUser } = require('./middlewares/checks');
const errorHandler = require('./middlewares/errorHandler');
const RentController = require('./controllers/RentController')


router.use(bodyParser.json())
router.get('/movies', MovieController.getMovies);
router.get('/movies/:id', MovieController.getMovieDetails);
router.get('/runtime/:max', MovieController.getMoviesByRuntime);
router.get('/verify/:id', UsersController.verifyUser)
router.get('/favourites', checkLoggedUser, MovieController.allFavouritesMovies)
router.post('/login', UsersController.login)
router.post('/register', UsersController.register)
router.post('/movie', checkLoggedIn, MovieController.addMovie)
router.post('/rent/:code', checkLoggedUser, RentController.rentMovie)
router.post('/favourite/:code', checkLoggedUser, MovieController.addFavourite)
router.use(errorHandler.notFound);

module.exports = router;