import React,{useContext} from 'react'
import Logo from '../img/logo.png'
import "../css/Navbar.css"
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
const Navbar = ({login}) => {
  const navigate = useNavigate()
  const {setModalOpen} = useContext(LoginContext)
  const loginStatus = ()=>{
    const token = localStorage.getItem("jwt")
   if(login || token){
     return [
      <>
        <Link to='/followingpost'>
          <li>My Following Post</li>
        </Link>

       <Link to='/profile'>
          <li>Profile</li>
        </Link>
        
        <Link to='/createPost'>
          <li>Create Post</li>
        </Link>


        <Link to="">
          <button className='primaryBtn' onClick={()=>setModalOpen(true)}>Logout</button>
        </Link>
      </>
     ]
   }else{
      return [
        <>
        <Link to='/signup'>
          <li>SignUp</li>
        </Link>
        <Link to='/signin'>
          <li>SignIn</li>
        </Link></>
      ]
   }
  }
  loginStatus()
  return (
    <div className='navbar'>
      <img src={Logo} alt='' style={{cursor:"pointer"}} onClick={()=>{navigate("/")}}/>
      <ul className='nav-menu'>
       {loginStatus()}
      </ul>
    </div>
  )
}

export default Navbar
