const express = require('express');
const router = express.Router();
const lsController = require('../controllers/lsController');


router.post('/ls', lsController.lsDirectory)

module.exports = router;