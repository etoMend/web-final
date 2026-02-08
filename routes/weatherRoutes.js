const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middleware/auth'); // Private endpoint requirement

router.get('/', auth, weatherController.getWeatherAndPollution);

module.exports = router;