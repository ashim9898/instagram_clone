import React from 'react'
import "../css/PostDetail.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PostDetail = (props) => {
  const navigate = useNavigate()
  const removePost = async(postId)=>{
    if(window.confirm("Do you really want to delete this post?")){
    try{
      
      const postDelete =await axios.delete(`http://localhost:5000/deletePost/${postId}`,{
        headers:{
          authorization: "Bearer " + localStorage.getItem("jwt")
        },
      })
      if (postDelete.status === 200) {
        // Successful deletion
        console.log("Success:", postDelete.data.message); // Display the success message from the backend
        props.toogleDetails();
        navigate("/")
      } else {
        // Handle other HTTP response statuses (e.g., 404, 401) as needed.
        console.error("Unexpected response status:", postDelete.status);
      }
    }catch(err){
      console.error("Error deleting post:", err);
    }
  }
  }
 

  return (
    <div className="showComment">
     <div className="container">
       <div className="postPic">
         <img src={props.item.photo} alt="" />
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
           <h5>{props.item.postedBy.name}</h5>
           <div className="deletePost" onClick={()=>{removePost(props.item._id)}}>
           <span className="material-symbols-outlined">
              delete
          </span>
           </div>
         </div>

         {/* commentSection */}
         <div
           className="comment-section"
           style={{ borderBottom: "1px solid #00000029" }}
         >
          {props.item.comments.map((item,id)=>{
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
           <p>{props.item.likes.length} Likes</p>
           <p>{props.item.body}</p>
         </div>

         {/* add Comment */}
         <div className="add-comment">
           <span className="material-symbols-outlined">mood</span>
           <input
             type="text"
             placeholder="Add a comment"
            //  value={comment}
            //   onChange={(e)=>{
            //     setComment(e.target.value)
            //   }}
          
           />
           <button
             className="comment"
            onClick={()=>{
             
            }}
           >
             Post
           </button>
         </div>
       </div>
     </div>
     <div className="close-comment" 
     onClick={
      ()=>{props.toogleDetails()}
      }
      >
       <span className="material-symbols-outlined material-symbols-outlined-comment">
         close
       </span>
     </div>
    </div>
  )
}

export default PostDetail