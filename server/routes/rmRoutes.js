const express = require('express');
const router = express.Router();
const rmController = require('../controllers/rmController');

router.post('/rm', rmController.rmFolder);

module.exports = router;