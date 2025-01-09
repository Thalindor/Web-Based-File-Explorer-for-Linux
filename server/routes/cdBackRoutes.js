const express = require('express');
const router = express.Router();
const cdBackController = require('../controllers/cdBackController');

router.post('/cdBack', cdBackController.cdBack);

module.exports = router;