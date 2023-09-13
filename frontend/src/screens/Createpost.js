import React,{useState, useEffect} from 'react'
import '../css/Createpost.css'
import axios from 'axios'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const notifyA = (msg)=>toast.error(msg)
const notifyB = (msg)=>toast.success(msg)

const Createpost = () => {
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
    if(url){
    fetch("http://localhost:5000/createPost",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      body,
      pic:url,
    })
  }).then(res=>res.json())
  .then(data=>{if(data.error){
    notifyA(data.error)
  }else{
    notifyB("Successfully Posted")
    navigate("/")
  }})
  .catch(err=>console.log(err))
}
    },[url])
    
  // Posting image to cloudinary
  const postDetails = async()=>{
    console.log(body,image)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","ashimcloud98")
   
    try{
      const response = await axios.post("https://api.cloudinary.com/v1_1/ashimcloud98/image/upload", data)
      setUrl(response.data.url)
      
    }catch(err){
      console.log(err.response.data)
    }
    // saving post in database
   
  
  
    
 }

  const loadfile = (event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
}
  return (
    <div className='createPost'>
        
        {/* header */}
      <div className='post-header'>
            <h4 style={{margin:"3px auto"}}>Create New Post</h4>
            <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img id="output" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg" alt=""/>
        <input type="file" accept='image/*' onChange={(event)=>{
          loadfile(event);
          setImage(event.target.files[0])
          }}
          />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
            <div className="card-pic">
                <img src="https://plus.unsplash.com/premium_photo-1664472603166-5c8e9ebcd9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" alt="" />
            </div>
            <h5>Ashim</h5>
        </div>
        <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} type='text' placeholder='Write a caption'></textarea>
      </div>
    </div>
  )
}

export default Createpost
