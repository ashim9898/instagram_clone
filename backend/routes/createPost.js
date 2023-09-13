const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model("Post")
// Route
router.get("/allposts",requireLogin,async(req,res)=>{
   try{
    const posts = await Post.find().populate("postedBy","_id name Photo")
    .sort("-createdAt")
    
    res.json(posts)
   }catch(err){
    console.log(err)
   }
})

router.post("/createPost",requireLogin,async(req,res)=>{
    const {body,pic} = req.body;
    if(!body || !pic){
        return res.status(422).json({error: "Please add all the fields"})
    }
    console.log(req.user)
    const post = new Post({
        body,
        photo:pic,
        postedBy:req.user
    })
    await post.save().then((result)=>{
        return res.json({message: "Your Post is saved"})
    }).catch(err=>console.log(err))
})

router.get("/myposts",requireLogin,async(req,res)=>{
    try{
        const posts = await Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .sort("-createdAt")
        res.json(posts)
       }catch(err){
        console.log(err)
       }
    })
    
    router.put("/like",requireLogin,async(req,res)=>{
        try {
            const result = await Post.findByIdAndUpdate(
              req.body.postId,
              {
                $push: { likes: req.user._id },
              },
              {
                new: true,
              }
            ).populate("postedBy","_id name Photo")
            .exec();
        
            res.json(result);
          } catch (err) {
            res.status(422).json({ error: err.message });
          }
        });


    router.put("/unlike",requireLogin,async(req,res)=>{
        try {
            const result = await Post.findByIdAndUpdate(
              req.body.postId,
              {
                $pull: { likes: req.user._id },
              },
              {
                new: true,
              }
            ).populate("postedBy","_id name Photo")
            .exec();
        
            res.json(result);
          } catch (err) {
            res.status(422).json({ error: err.message });
          }
        });

    router.put("/comment",requireLogin,async(req,res)=>{
      try {
        const comment = {
          comment: req.body.text,
          postedBy: req.user._id
        }
        const result = await Post.findByIdAndUpdate(
          req.body.postId,
              {
                $push: { comments:comment },
              },
              {
                new: true,
              }
            ).populate("comments.postedBy","_id name Photo")
            .populate("postedBy","_id name")
            .exec();
            res.json(result);
        
        }catch(err){
          console.log(err)
        }
    })
  //Api to delete post
  router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
  
      if (deletedPost) {
        res.json({
          message: "Post deleted successfully",
          deletedPost: deletedPost, // Optionally, you can send back the deleted post
        });
      } else {
        res.status(404).json({
          message: "Post not found", // Respond with a 404 status code if the post wasn't found
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while deleting the post", // Handle errors gracefully
      });
    }
  });

  //to show following post
  router.get("/myfollowingpost",requireLogin,async(req,res)=>{
    try{ 
    const followingPost = await Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .lean()
    if(followingPost){
      res.json(followingPost)
    }
    }catch(err){
      console.log(err)
    }
  })
module.exports = router