const express = require("express")
const connectToMongo = require("./db");

connectToMongo();

var cors = require('cors')
var app = express()
require("dotenv").config();
app.use(cors())

const port = 5000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello ")
})

//routes throught file 
app.use("/api/auth", require("./routes/auth"))

app.use("/api", require("./routes/upload"))
app.use("/api/postInt", require("./routes/postInt"))

app.use(cors()); // allow requests from frontend
app.listen(port, () => {
    console.log(`Notebook backend listening to ${port}`)
})