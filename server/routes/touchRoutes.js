const express = require('express');
const router = express.Router();
const touchController = require('../controllers/touchController');

router.post('/touch', touchController.touchFile);

module.exports = router;