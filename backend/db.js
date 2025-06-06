const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/social-media-app"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;