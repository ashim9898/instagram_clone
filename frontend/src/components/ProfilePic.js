import React,{useState,useEffect ,useRef} from 'react'
import "../css/Profile.css"
import axios from 'axios'
const ProfilePic = (props) => {
    const hiddenFileInput = useRef(null)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

      // Posting image to cloudinary
  const postDetails = async()=>{
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
  }
    // saving post in database
    const postPic = ()=>{
    
        fetch("http://localhost:5000/uploadProfilePic",{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          pic:url,
        })
      }).then(res=>res.json())
      .then(data=>{
       console.log(data)
       props.changeProfile()
       window.location.reload()
    }
    )
      .catch(err=>console.log(err))
   }
    
    const handleClick = ()=>{
        hiddenFileInput.current.click()
    }

    useEffect(()=>{
        if(image){
          postDetails()
        }
       
    },[image])

    useEffect(()=>{
        if(url){
          postPic()
        }
       
    },[url])
  return (
    <div className='profilePic darkBg'>
      <div className="changePic centered">
        <div>
            <h2>Change Profile Photo</h2>
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button className='upload-btn' style={{color:"rgb(30,161,247)"}}
                onClick={handleClick}
            >
                Upload Photo
            </button>
            <input 
            type="file" 
            ref={hiddenFileInput} 
            accept='image/*' 
            style={{display:"none"}}
            onChange={(e)=>{
                setImage(e.target.files[0])
            }}
            />
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button 
                className='upload-btn' 
                onClick={()=>{
                    setUrl(null)
                    postPic()
                }}
                style={{color:"#ED4956"}}
            >
                Remove Current Photo
            </button>
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button style={{background:'none',border:'none',cursor:"pointer",fontSize:"15px"}}
            onClick={ props.changeProfile}
            > Cancel </button>
        </div>
      </div>
      
    </div>
  )
}

export default ProfilePic
