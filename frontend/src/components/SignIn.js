import React,{useState,useContext} from 'react'
import "../css/SignIn.css"
import Logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {toast} from 'react-toastify';
import { LoginContext } from '../context/LoginContext'
const SignIn = () => {
  const {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate()
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

//Toast Functions
const notifyA = (msg)=>toast.error(msg)
const notifyB = (msg)=>toast.success(msg)

  const postData = async()=>{
    try {
      const res = await axios.post(`http://localhost:5000/signin`, {
        email: email,
        password: password
      });
    if(res.data){
      notifyB("Signed In Successfully")
      console.log(res.data.token)
      localStorage.setItem("jwt",res.data.token)
      localStorage.setItem("user",JSON.stringify(res.data.user))
      setUserLogin(true)
      navigate('/')
    }
  }catch(error){
    notifyA("Invalid credentials")
    console.error("Error:", error);
  }
  }
  return (
    <div className='signIn'>
      <div>
            <div className="loginForm">
            <img className='signUpLogo' src={Logo} alt="" /> 
            <div>
              <input type="email" name="email" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail
              (e.target.value)}}/>
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder='Password'  value={password} onChange={(e)=>{setPassword
              (e.target.value)}}/>
        </div>
            <input type="submit" id='login-btn' value="Sign In" onClick={()=>{postData()}}/>
            </div>
            <div className="loginForm2">
                Dont have an account ? 
                <Link to="/signup">
                    <span style={{color:"blue", cursor:"pointer"}}> Sign Up</span>
                </Link>
            </div>
      </div>
    </div>
  )
}

export default SignIn
