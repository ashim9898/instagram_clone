import React,{useEffect,useState} from 'react'
import "../css/Profile.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const picLink = "https://cdn-icons-png.flaticon.com/128/9069/9069049.png"  
  const {userId} = useParams()
    const [isFollow, setIsFollow] = useState(false)
    const [user, setUser] = useState("")
    const [posts,setPosts] =  useState([])

    // to follow user
    const followUser = async(userId)=>{
      try{
        const result = await axios.put(
          `http://localhost:5000/follow`,
          { followId: userId, }, // The request body should be an object with the followId property
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
      })
      
      if(result){
        console.log(result.data)
        setIsFollow(true)
      }
    }catch(err){
      console.log(err);
    }
    }

    // to unfollow user
    const unfollowUser = async(userId)=>{
      try{
        const result = await axios.put(
          `http://localhost:5000/unfollow`,
          { followId: userId, }, // The request body should be an object with the followId property
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
      })
      if(result){
        console.log(result.data)
        setIsFollow(false)
      }
    }catch(err){
      console.log(err)
      
    }
    }

    //fetchdata from user/:id
    useEffect(()=>{
      const fetchData = async()=>{
      try{
      const result = await axios.get(`http://localhost:5000/user/${userId}`,{
        headers:{
          authorization: "Bearer " + localStorage.getItem("jwt")
        }
        
      })
      setUser(result.data.users)
      setPosts(result.data.posts)
      
      if(result.data.users.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
        setIsFollow(true)
      }else{
        setIsFollow(false)
      }
     
      }catch(err){
        console.log(err)
      }
      
    }
    fetchData()
    },[userId])

  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className='profile-frame'>
        {/* Profile Pic */}
          <div className='profile-pic'>
            <img src={user.Photo?user.Photo:picLink}
            
            alt=""/>
          </div>
          {/* Profile data */}
          <div className='profile-data'>
            <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
            <h1>{user.name}</h1>
            {user && (
            <button className='followBtn'
              onClick={()=>{
                if(isFollow){
                unfollowUser(user._id)
                }else{
                  followUser(user._id)
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
            )}
            </div>
            
            <div className='profile-info' style={{ display:"flex" }}>
              <p>{posts.length} Posts</p>
              <p>{user.followers? user.followers.length:"0"} followers</p>
              <p>{user.following? user.following.length:"0"} following</p>
            </div>
          </div>
      </div>
    <hr style={{
      width:"90%",
      opacity:"0.8",
      margin:"25px auto",
    }}/>
    {/* Gallery */}
      <div className='gallery'>
        {posts.map((item)=>{
          return(
            <img key={item._id} src={item.photo} 
            // onClick={()=>{
            //   toogleDetails(item)
            // }}
            className='item' alt=""/>
          )
        })}
       
        
      </div>
      {/* {show &&
      <PostDetail item={posts}/>
       <PostDetail item={posts} toogleDetails={toogleDetails}/>
      } */}
    </div>
  )
}

export default UserProfile
