const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    place_id: {
        type: Number,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
},{
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;