const express = require('express');
const router = express.Router();
const echoController = require('../controllers/echoController');


router.post('/echo', echoController.echoText)

module.exports = router;