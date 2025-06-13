const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    place_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    thumbnail: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    location: {
        lat: Number,
        lng: Number
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    }
}, {
    timestamps: true,
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
