const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    post_name: {
        type: String,
        required: true,
        unique: true
    },
    post_description: {
        type: String,
        required: true
    },
   
    date: {
        type: Date,
        default: Date.now
    },
     LikeCount: {
        type: Number,
        default: 0
    },
    CommentCount: {
        type: Number,
        default: 0
    }});
const Post = mongoose.model('post', PostSchema);
Post.createIndexes();
module.exports = Post;  
