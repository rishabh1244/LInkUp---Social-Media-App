const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    posts: {
        type: Number,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.models.user || mongoose.model('user', UserSchema);;
User.createIndexes();
module.exports = User  
