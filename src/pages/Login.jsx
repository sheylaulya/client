import React, { useEffect, useState } from 'react'
import "../style/style.css"
import "../style/registration.css"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";



const Login = () => {


  const navigate = useNavigate() 
 
  axios.defaults.withCredentials = true; 
   
  const [values, setValues] = useState({ 
  Username: '', 
  Password:'' 
  }) 
   
  const handleSubmit = (e) => { 
      e.preventDefault(); 
      axios.post('http://localhost:8800/users/login', values) 
      .then(async res => { 
          // kalo response nya success 
          if (res.data.status === "success") { 
              // token nya di simpen di localStorage nya react 
              localStorage.setItem("token", res.data.token) 
              localStorage.getItem("token") // ini kalo mau ngambil token nya 
              navigate('/home'); 
          } else { 
              alert(res.data.message); 
          } 
      }) 
      .catch(err => console.log(err)); 
  }


return (

<div className='container'>
  <div className="logo">
    <Link to="/" style={{textDecoration:"none", backgroundColor:"transparent", color: "#292B39"}}>Logo</Link>
  </div>

  <h2>Sign In To <span>NamawebNya</span></h2>
  <form action="" onSubmit={handleSubmit}>
    <div className="form" style={{display:'flex', flexDirection:'column', gap:20}}>
      <input type="text" placeholder='Username' onChange={(e)=>{setValues({...values, Username: e.target.value})}}/>
      <input type="password" placeholder='Password' onChange={(e)=>{setValues({...values, Password: e.target.value})}}/>
      <button>Sign In</button>
      <p>You are new here? <span>
          <Link to="/regist" style={{textDecoration:"none", backgroundColor:"transparent", color: "#F6B17A"}}>Register
          </Link></span></p>
    </div>
  </form>

  {/* <p>{loginStatus}</p> */}
  <div className="blur-top"></div>
  <div className="blur-bot"></div>

</div>
)
}

export default Login