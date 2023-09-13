const jwt = require('jsonwebtoken')
const {Jwt_secret} = require('../keys') 
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = async(req,res,next)=>{

    
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You need to login"})
    }
    const token = authorization.replace("Bearer ",
    "")
    try {
        const payload = jwt.verify(token, Jwt_secret);
        const { _id } = payload;

        // Fetch user data and assign it to req.user
        const userData = await User.findById(_id);
        req.user = userData;

        next();
    } catch (err) {
        return res.status(401).json({ error: "You need to login" });
    }
};
       
    
   
