const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');


router.post('/cat', catController.cat)

module.exports = router;