const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    body:{
        type: String,
        required:true
    },
    photo:{
        type: String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        comment: {type: String},
        postedBy: {type: ObjectId, ref:"User"}
    }],
    postedBy:{
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

module.export = mongoose.model("Post", postSchema)