const express = require('express');
const router = express.Router();
const authJWT = require('../middleware/authJWT');
const { createBooking, checkBooking, getAllBookingByUser } = require('../controller/bookingController');

router.post('/booking', authJWT, createBooking);
router.get('/booking', authJWT, getAllBookingByUser);
router.get('/booking/:place_id', authJWT, checkBooking);

module.exports = router;