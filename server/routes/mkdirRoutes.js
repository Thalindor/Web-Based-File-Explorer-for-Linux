const express = require('express');
const router = express.Router();
const mkdirController = require('../controllers/mkdirController');

router.post('/mkdir', mkdirController.mkdirFolder);

module.exports = router;