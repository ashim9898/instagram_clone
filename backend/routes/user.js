const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin")
const Post = mongoose.model("Post")
const USER = mongoose.model('User')

//to get user profile
router.get("/user/:id", async(req, res) => {
    try {
      const users = await USER.findOne({_id: req.params.id }).select("-password");
  
      if (users) {
        // User found, send a JSON response
        const posts =await Post.find({postedBy: req.params.id}).populate("postedBy","_id").exec();
        res.json({users,posts})
      } else {
        // User not found, send a 404 error response
        res.status(404).json({ message: "User not found" });
      }
      
    } catch (err) {
      // Handle any errors that occur during the database query
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  //to follow user
  router.put("/follow",requireLogin,async(req,res)=>{
    try{
    const follow = await USER.findByIdAndUpdate(req.body.followId,{
      $push: {followers: req.user._id}
    },{
      new: true
    })
    if(follow){
      const followings = await USER.findByIdAndUpdate(req.user._id,{
        $push: {following: req.body.followId}
      },{
        new:true
      })
      if(followings){
        res.json(followings)
      }else{
        res.json({message: "No followings"})
      }
    }
    }catch(err){
      res.json({err: "Error Message"})
    }
  })

  //to unfollow user
  router.put("/unfollow",requireLogin,async(req,res)=>{
    try{
    const follow = await USER.findByIdAndUpdate(req.body.followId,{
      $pull: {followers: req.user._id}
    },{
      new: true
    })
    if(follow){
      const followings = await USER.findByIdAndUpdate(req.user._id,{
        $pull: {following: req.body.followId}
      },{
        new:true
      })
      if(followings){
        res.json(followings)
      }else{
        res.json({message: "No followings"})
      }
    }
    }catch(err){
      res.json({err: "Error Message"})
    }
  })

  // to upload pp
  router.put("/uploadProfilePic",requireLogin,async(req,res)=>{
    try{
    const upload = await USER.findByIdAndUpdate(req.user._id,{
      $set: {Photo:req.body.pic}
    },{
      new: true
    }).exec()
    if(upload){
      res.json(upload)
    }
  }catch(err){
    console.log(err)
  }
  })
module.exports=router;