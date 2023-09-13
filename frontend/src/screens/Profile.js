import React,{useEffect,useState} from 'react'
import "../css/Profile.css"
import axios from 'axios'
import PostDetail from '../components/PostDetail'
import ProfilePic from '../components/ProfilePic'


const Profile = () => {
  const picLink = "https://cdn-icons-png.flaticon.com/128/9069/9069049.png"
    const [pic, setPic] = useState([])
    const [show,setShow] = useState(false)
    const [posts,setPosts] =  useState([])
    const [changePic,setChangePic] = useState(false)
    const [user, setUser] = useState([])
    
    const toogleDetails = (posts)=>{
      if(!show){
        setShow(true)
        setPosts(posts)
      
      }else{
        setShow(false)
       
      }
    
    }

    const changeProfile = ()=>{
      if(changePic){
        setChangePic(false)
      }else{
        setChangePic(true)
      }
    }

    useEffect(()=>{
      const fetchData = async()=>{
      try{
      const result = await axios.get(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
        headers:{
          Authorization:"Bearer " + localStorage.getItem("jwt")
        }
        
      })
     
      setPic(result.data.posts)
      setUser(result.data.users)
     
      }catch(err){
        console.log(err)
      }
      
    }
    fetchData()
    },[])

  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className='profile-frame'>
        {/* Profile Pic */}
          <div className='profile-pic'>
            <img
              onClick={changeProfile} 
              src={user.Photo?user.Photo:picLink} 
              alt=""/>
          </div>
          {/* Profile data */}
          <div className='profile-data'>
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className='profile-info' style={{ display:"flex" }}>
              <p>{pic? pic.length:0} posts</p>
              <p>{user.followers? user.followers.length:0} followers</p>
              <p>{user.followers? user.following.length:0} following</p>
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
        {pic.map((item)=>{
          return(
            <img key={item._id} src={item.photo} 
            onClick={()=>{
              toogleDetails(item)
            }}
            className='item' alt=""/>
          )
        })}
       
        
      </div>
      {show &&
      <PostDetail item={posts} toogleDetails={toogleDetails}/>
      }
      {
        changePic && 
        <ProfilePic changeProfile={changeProfile}/>
      }
    </div>
  )
}

export default Profile
