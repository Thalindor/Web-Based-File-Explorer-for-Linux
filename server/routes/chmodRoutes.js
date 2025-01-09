const express = require('express');
const router = express.Router();
const chmodController = require('../controllers/chmodController');


router.post('/chmod', chmodController.chmodFile)

module.exports = router;