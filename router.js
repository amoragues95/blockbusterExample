const express = require('express');
const movieController = require('./controllers/movieController')
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json())
router.use(express.json());
router.use(express.urlencoded({extended: true}))

router.get('/movies',movieController.getMovies);

module.exports = router;
