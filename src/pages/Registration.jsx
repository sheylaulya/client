import React, { useState } from 'react'
import "../style/style.css"
import "../style/registration.css"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";



const Registration = () => {

  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
})



const navigate = useNavigate()

const handleChange = (e) =>{
  setUser(prev=>({
      ...prev,[e.target.name]: e.target.value
  }))
}

const handleClick = async e =>{
  e.preventDefault() 
   try{
      await axios.post("http://localhost:8800/users/register", user)
      navigate('/')
              }catch(err){
      console.log(err)
              }
}


  return (
    <div className='container'>
          <div className="logo"><Link to="/" style={{textDecoration:"none", backgroundColor:"transparent", color: "#292B39"}}>Logo</Link></div>

<h2>Register To <span>NamawebNya</span></h2>


<input type="text" placeholder='Username' onChange={handleChange} name='username'/>
<input type="email" placeholder='Email'  onChange={handleChange} name='email'/>
<input type="password" placeholder='Password' onChange={handleChange} name='password'/>
<button  onClick={handleClick}>Register</button>
<p>You are an old user? <span><Link to="/login" style={{textDecoration:"none", backgroundColor:"transparent", color: "#F6B17A"}}>Login</Link></span></p>

     <div className="blur-top"></div>
<div className="blur-bot"></div>

    </div>
  )
}

export default Registration