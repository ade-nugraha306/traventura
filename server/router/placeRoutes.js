const express = require('express');
const router = express.Router();
const PlaceController = require('../controller/placeController');

router.post('/recommendations', PlaceController.getRecommendations);
router.get('/recommendations/random', PlaceController.randomRecommendations);
router.post('/predict', PlaceController.predictRecommendation);
router.post('/chatbot', PlaceController.chatbot);
router.post('/popularitas', PlaceController.checkPopularity)
router.get('/place/:id', PlaceController.getPlaceById);

module.exports = router;
