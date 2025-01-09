const express = require('express');
const router = express.Router();
const rmFilesController = require('../controllers/rmFilesController');

router.post('/rmFiles', rmFilesController.rmFiles);

module.exports = router;