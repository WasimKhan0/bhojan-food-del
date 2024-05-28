import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPopup = ({ setShowLogin, setShowAdmin, showAdmin, showLogin }) => {
   const { url, setToken } = useContext(StoreContext);
   const [currState, setCurrState] = useState("Login");
    const navigate = useNavigate();
   const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
   })

   const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData((data) => ({ ...data, [name]: value }));
   }
   
   useEffect(() => {
       if (showAdmin && showLogin) {
         setCurrState('Admin');

      } 
   },[])

   const temp=()=>{
      setShowLogin(false)
      setShowAdmin(false)
   }
   const onLogin = async (e) => {
      e.preventDefault();
      
       
      let newUrl = url;
      if (currState === 'Login') {
         newUrl += '/api/user/login'
      } else if (currState === 'Admin') {
         newUrl += '/api/user/admin'
      } else {
         newUrl += '/api/user/register'
      }
      try {
         const res = await axios.post(newUrl, data);
         console.log(res)

         if (res.data.success && res.data.message === "admin logged in") {
            localStorage.setItem("admin", true);
            navigate('/admin');
         }
          if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token)
            setShowLogin(false);
         }
         else {
            alert(res.data.message);
         }
      } catch (err) {
         console.log("err", err)
      }
   }
   return (
      <div className='login-popup'>
         <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
               <h2>{currState}</h2>
               <img onClick={() => temp()} src={assets.cross_icon}></img>
            </div>
            <div className="login-popup-inputs">
               {
                  currState === "Login" || currState==='Admin'? <></> :
                     <input onChange={(e) => onChangeHandler(e)} name='name' value={data.name} type='text' placeholder='Your name' required />
               }
               <input onChange={(e) => onChangeHandler(e)} name='email' value={data.email} type='email' placeholder='Your email' required />
               <input onChange={(e) => onChangeHandler(e)} name='password' value={data.password} type='password' placeholder='Password' required />
            </div>
             <button type='submit'>{currState === "Admin" ? "Admin Login" : currState==='Login'?"Login": "Create account"}</button>
 
          {currState!=='Admin'?<div className="login-popup-condition">
               <input type='checkbox' required/>
               <p>By continuing, i agree to terms of use & privacy policy.</p>
            </div>:<></>}
            
            
            {
               currState === 'Admin' ? (
                  <></>
               ) : currState === 'Sign Up' ? (
                  <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
               ) : (
                  <p>Create new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
               )
            }



         </form>
      </div>
   )
}

export default LoginPopup
