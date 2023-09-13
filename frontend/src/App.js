import logo from './logo.svg';
import './App.css';
import React,{createContext, useState} from 'react';
import Navbar from './components/Navbar';
import{Route, Routes} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './screens/Profile';
import Home from './screens/Home';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './screens/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';
function App() {
  const [userLogin,setUserLogin] = useState(false)
  const[modalOpen, setModalOpen]=useState(false)
  return (
    <div className="App">
      <LoginContext.Provider value={{setUserLogin, setModalOpen}}> 
     <Navbar login={userLogin}/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/createPost" element={<Createpost />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/followingpost" element={<MyFollowingPost />} />
    </Routes>
    <ToastContainer theme='dark'/>
    
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    </LoginContext.Provider>
    </div>
  );
}

export default App;
