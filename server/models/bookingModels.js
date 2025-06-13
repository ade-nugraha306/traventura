const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    place_id: {
        type: Number,
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;