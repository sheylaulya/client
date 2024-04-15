import React, { useEffect, useState } from 'react'
import "../style/style.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Icon } from '@iconify/react';

const Header = () => {

    
const [auth, setAuth] = useState(false)
const [name, setName] = useState('')
const [fullName, setFullName] = useState('')
const [id, setId] = useState()

const [avatar, setAvatar] = useState('')


const navigate = useNavigate()


const [message, setMessage] = useState('')


useEffect(()=>{
    fetchData()
})

const fetchData = async () => {
    const token = localStorage.getItem("token") ?? "";
    
    // menaruh token ke dalam header request
    const config = {
        headers:{
         "Authorization": token
        }
    }
    axios.get('http://localhost:8800/', config) // mengirim token ke server
    .then(res => {
        if(res.data.status === "success"){
            setAuth(true)
            setName(res.data.user.Username);
            setFullName(res.data.user.NamaLengkap);
            setId(res.data.user.UserID)
        } else{
            setMessage(res.data.message)
        }
    })
}

console.log(id)
const handleLogout = () => {
    axios.post('http://localhost:8800/users/logout')
    .then(res => {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Set status autentikasi menjadi false
        setAuth(false);
        setName('');
        setFullName('');
        setMessage('Logout berhasil');
        navigate('/')
    })
    .catch(error => {
        console.error('Error:', error);
        setMessage('Error occurred while logging out');
    });
};

const [dropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
setDropdownVisible(!dropdownVisible);
};

return (
<div className=""
    style={{position:'fixed',  margin:"auto", width:"100%", height:100, backgroundColor:'#292B39', display: 'flex', justifyContent:'center', alignItems:'center'}}>
    <header style={{display:"flex", justifyContent:"space-between", alignItems: 'center'}}>
        <Link to="/home" style={{textDecoration:"none", backgroundColor:"transparent", }}>
        <div className="app-logo shadow" style={{width:120, height:50, backgroundColor:"black", color:'white', borderRadius:40, textAlign:'center'}}>
            logo
        </div>
        </Link>
        <div className="search-bar" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

            <input type="search" className='' placeholder="search" />
        </div>

        <div className="account" style={{ display: "flex", gap: 10 ,}} onClick={toggleDropdown}>
            <div className="acc-det" style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-end" }}>
                <p className="name">{fullName}</p>
                <p className="username">@{name}</p>
            </div>
            <div className="acc-img">
            {avatar ? ( // Jika src memiliki nilai
                <img
                    style={{ width: 50, height: 50, borderRadius: 200 }}
                    src=""
                    alt=""
                />
            ) : ( // Jika src tidak memiliki nilai
                <Icon
                    className='avatar'
                    style={{ backgroundColor: 'transparent', width: 40, height: 40, borderRadius: 200, color: 'white' }}
                    icon="ion:person-sharp"
                />
            )}
            </div>
            {dropdownVisible && (
            <div className="dropdown"
                style={{ position: "absolute", top: "20px", right: "50px", backgroundColor: "white", padding: "0px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", }}>
                <Link to={'/profile/'+id} style={{textDecoration:"none", backgroundColor:"transparent", }}>
                <p style={{ cursor: "pointer" , }}>Profile</p>
                </Link>
                <Link to="" onClick={handleLogout} style={{textDecoration:"none", backgroundColor:"transparent", }}>
                <p style={{ cursor: "pointer" ,}}>Logout</p>
                </Link>
            </div>
            )}
        </div>
    </header>
</div>

)
}

export default Header