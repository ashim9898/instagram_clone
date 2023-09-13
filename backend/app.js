const express = require('express')
const app = express();
const PORT = 5000;
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
require('./models/model')
require('./models/post')

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))

mongoose.connect("mongodb+srv://ashimcsit17:ashimbarca100@cluster0.k0wu9w0.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("Not connected to mongodb")
})





app.get('/',(req,res)=>{
   
})

app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})