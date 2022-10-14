const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MovieController = require('./controllers/MovieController');

router.use(bodyParser.json())
router.get('/movies', MovieController.getMovies);

module.exports = router;