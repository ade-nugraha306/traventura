const express = require('express');
const router = express.Router();
const { searchPlaces } = require('../controller/searchController');

// Endpoint pencarian
router.get('/search', searchPlaces);

module.exports = router;
