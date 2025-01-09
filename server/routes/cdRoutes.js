const express = require('express');
const router = express.Router();
const cdController = require('../controllers/cdController');

router.post('/cd', cdController.cd);

module.exports = router;