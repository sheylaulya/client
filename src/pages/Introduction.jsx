
import { Link } from "react-router-dom";
import React from 'react'
import "../style/intro.css"



const Introduction = () => {
  return (
    <div className="container">
    <div className="logo"><Link to="/" style={{textDecoration:"none", backgroundColor:"transparent", color: "#292B39"}}>Logo</Link></div>
<h1 className="title"> 
    <span>Discover </span>  
    And <span>Share </span>  
    New <span>Ideas</span>
</h1>
<div className="btn-regist-login">
    <button className="btn-regist"><Link to="/regist" style={{textDecoration:"none", backgroundColor:"transparent", color: "#292B39"}}>Registration</Link></button>
    <button className="btn-login"><Link to="/login" style={{textDecoration:"none", backgroundColor:"transparent", color: "white"}}>Login</Link></button>
</div>
<div className="blur-top"></div>
<div className="blur-bot"></div>
</div>
  )
}

export default Introduction