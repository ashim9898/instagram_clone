const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const USER = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Jwt_secret} = require("../keys")
const requireLogin = require('../middlewares/requireLogin')
router.get("/",(req,res)=>{
    res.send("hello")
})

router.post("/signup",(req,res)=>{
  const{name,userName,email,password} = req.body;
  if(!name || !email || !userName || !password){
   return res.status(422).json({error:"please add all the fields"})
  }
  USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User already exist"})
    }
    bcrypt.hash(password, 12).then((hashedPassword)=>{

    
    const user = new USER({
        name,
        email,
        userName,
        password:hashedPassword
      })
      user.save()
      .then(user=>{res.json({message:"saved successfully"})})
      .catch(err=>console.log(err))
    })
})
  
})

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please add email and password" });
    }

    const savedUser = await USER.findOne({ email: email });

    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email" });
    }

    // Use async/await with bcrypt.compare
    const result = await bcrypt.compare(password, savedUser.password);

    if (result) {
      const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
      const {_id, name, email,userName} = savedUser
       res.json({token, user:{_id, name, email, userName}});
       console.log({token, user:{_id, name, email, userName}})
    } else {
      return res.status(422).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports=router;