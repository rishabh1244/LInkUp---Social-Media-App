// models/Likes.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikeSchema = new Schema({
    postName: { type: String, required: true },
    postAuthor: { type: String, required: true },
    LikedBy: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// ✅ Rename to match usage
const Likes = mongoose.model('Like', LikeSchema); // Capital L and singular
module.exports = Likes;
