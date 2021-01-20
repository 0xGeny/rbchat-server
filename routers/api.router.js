
var express = require('express');
var router = express.Router();
var controller = require('../controllers/api.controller');

router.get('/all', controller.getAll);

module.exports = router;