import React,{useEffect,useState} from 'react'
import '../css/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify';

const MyFollowingPost = () => {
const navigate = useNavigate()
const [data,setData] = useState([])
const [comment,setComment] = useState("")
const[show, setShow]= useState(false)
const [item1, setItem1]=useState([])

//Toast Functions
const notifyA = (msg)=>toast.error(msg)
const notifyB = (msg)=>toast.success(msg)

useEffect(()=>{
  const fetchData = async()=>{
  const token = localStorage.getItem("jwt")
  if(!token){
    navigate("./signup")
  }
  // Fetching all posts
  try{
  const allPosts = await axios.get("http://localhost:5000/myfollowingpost",{
    headers:{
      authorization: "Bearer " + localStorage.getItem("jwt")
    }
  });
  console.log(allPosts)
  const posts = allPosts.data;
  setData(posts)
  }catch(err){
    console.log(err)
  }
}
fetchData()
},[])

// to show and hide comments
const toogleComment = (item)=>{
  if(!show){
    setShow(true)
   setItem1(item)
  console.log(item1)
  }else{
    setShow(false)
   
  }

}

// For Likepost Integration
const likePost = async(id)=>{
  
  try{
    const likedPost = await axios.put("http://localhost:5000/like",{
      postId: id
  },{headers:{
        authorization: "Bearer " + localStorage.getItem("jwt")
      },
     
    })
   const likedClicked = likedPost.data 
   const newData = data.map((item)=>{
    if(item._id === likedClicked._id){
      return likedClicked
    }else{
      return item
    }
   })
   setData(newData)
   console.log(likedClicked)
  }catch(err){
    console.log(err)
  }
  
}
// For Unlikepost Integration
const unlikePost = async(id)=>{
  
  try{
    const unlikedPost = await axios.put("http://localhost:5000/unlike",{
      postId: id
  },{headers:{
        authorization: "Bearer " + localStorage.getItem("jwt")
      },
     
    })
    const unlikedClicked = unlikedPost.data 
    const newData = data.map((item)=>{
      if(item._id === unlikedClicked._id){
        return unlikedClicked
      }else{
        return item
      }
     })
     setData(newData)
   console.log(unlikedClicked)
  }catch(err){
    console.log(err)
  }
  
}

// Function to make comment
const makeComment = async(text,id)=>{
  try{
    const commentPost = await axios.put("http://localhost:5000/comment",{
      text:text,
      postId: id,
  },{headers:{
        authorization: "Bearer " + localStorage.getItem("jwt")
      },
     
    })
   const result = commentPost.data 
   const newData = data.map((item)=>{
    if(item._id === result._id){
      return result
    }else{
      return item
    }
   })
   setData(newData)
   setComment("")
   notifyB("successfully commented")
   console.log(result)
  }catch(err){
    console.log(err)
  }

}

  return (
    <div className='home'>
      {/* card */}
      {data.map((item,id)=>{
        return(
          <div className='card' key={item._id}>
          {/* card header */}
          <div className='card-header'>
            <div className='card-pic'>
            <img src="https://plus.unsplash.com/premium_photo-1664472603166-5c8e9ebcd9ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" alt=""/>
            </div>
            <h5>
            <Link to={`/profile/${item.postedBy._id}`}>{item.postedBy.name}</Link>
            </h5>
          </div>
          
  
          {/* card Image */}
          <div className='card-image'>
            <img src={item.photo} alt=""/>
          </div>
  
          {/* card content */}
         <div className='card-content'>
          {
            item.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
            ?
            (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{unlikePost(item._id)}}>
            favorite
          </span>)
          :
          (<span className="material-symbols-outlined" onClick={()=>{likePost(item._id)}}>
          favorite
        </span>)
          }
         
          
          <p>{item.likes.length} Likes</p>
          <p>{item.body}</p>
          <p
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          toogleComment(item);
        }}
          >
            View all comments
          </p>
         </div>
  
          {/* Add comment */}
         <div className='add-comment'>
         <span className="material-symbols-outlined">
            mood
         </span>
          <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
          <button className='comment' onClick={()=>makeComment(comment,item._id)}>Post</button>
         </div>
        </div>
        )
      })}




 {/* Show Comment */}
 { show && (
     <div className="showComment">
     <div className="container">
       <div className="postPic">
         <img src={item1.photo} alt="" />
       </div>
       <div className="details">
         {/* card header */}
         <div
           className="card-header"
           style={{ borderBottom: "1px solid #00000029" }}
         >
           <div className="card-pic">
             <img
               src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
               alt=""
             />
           </div>
           <h5>{item1.postedBy.name}</h5>
         </div>

         {/* commentSection */}
         <div
           className="comment-section"
           style={{ borderBottom: "1px solid #00000029" }}
         >
          {item1.comments.map((item,id)=>{
            return(
              <p className='comm' key={item._id}>
                <span className='commenter' style={{ fontWeight:"bolder"}}>{item.postedBy.name}{" "} </span>
                <span className='commentText'>{item.comment} </span>
              </p>
            )
            
          })}
          </div>

         {/* card content */}
         <div className="card-content">
           <p>{item1.likes.length} Likes</p>
           <p>{item1.body}</p>
         </div>

         {/* add Comment */}
         <div className="add-comment">
           <span className="material-symbols-outlined">mood</span>
           <input
             type="text"
             placeholder="Add a comment"
             value={comment}
              onChange={(e)=>{
                setComment(e.target.value)
              }}
          
           />
           <button
             className="comment"
            onClick={()=>{
              makeComment(comment, item1._id);
              toogleComment()
            }}
           >
             Post
           </button>
         </div>
       </div>
     </div>
     <div className="close-comment" onClick={()=>toogleComment()}>
       <span className="material-symbols-outlined material-symbols-outlined-comment">
         close
       </span>
     </div>
    </div>
    )
 }
  </div>
  
  
  )
}

export default MyFollowingPost
