var express = require('express');
var router = express.Router();
var movie_controller = require('../Controllers/MovieController');

router.get('/movies', movie_controller.GetAll);
router.get('/movies/:title', movie_controller.GetByTitle);

module.exports = router;