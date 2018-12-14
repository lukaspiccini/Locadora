var express = require('express');
var router = express.Router();
var user_controller = require('../Controllers/UserController');

router.post('/user', user_controller.create_user)


module.exports = router;
