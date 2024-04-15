import React, { useEffect, useState } from 'react'
import "../style/style.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Nav from './Nav'
import { Icon } from '@iconify/react';


const Home = () => {



const navigate = useNavigate()



const [posts, setPosts] = useState([])


useEffect(()=>{
const fetchAllUsers = async ()=>{
try{
const res = await axios.get("http://localhost:8800/posts")

// console.log(res)
setPosts(res.data)


}catch(err){
console.log(err)
}
}
fetchAllUsers()
},[])


const [avatar, setAvatar] = useState('')
const dataTrends = Array.from({ length: 2 }, (_, index) => index + 1);
const dataAct = Array.from({ length: 10 }, (_, index) => index + 1);

return (
<div className="">
    < Header />
    < Nav />
    <div className='containers' style={{}}>
        <div className="header-break"></div>

        <div className="content" style={{ display:'flex', gap:'2%'}}>
            <div className="left-content wrapper" style={{width:'68%', }}>

                {posts.map(posts => (
                <Link to={'/posts/'+posts.FotoID}> <div className="card"
                    style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <img src={'http://localhost:8800/images/'+posts.LokasiFile}
                    style={{ width: 200, height: 200, borderRadius: 20, backgroundColor: 'white', objectFit:'cover' }}
                    alt="" />
                <div className="" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="acc-img">
            {avatar ? ( // Jika src memiliki nilai
                <img
                    style={{ width: 15, height: 15, borderRadius: 200 }}
                    src=""
                    alt=""
                />
            ) : ( // Jika src tidak memiliki nilai
                <Icon
                    className='avatar'
                    style={{ backgroundColor: 'transparent', width: 15, height: 15, borderRadius: 200, color: 'white' }}
                    icon="ion:person-sharp"
                />
            )}
            </div>
                    <p style={{ fontSize: 14, width: 100, textAlign: 'start' }}>{posts.Username}</p>
                </div>
            </div>
            </Link>
            ))}
        </div>

        <div className="right-content"
            style={{width:'28%', height:'80vh', display:'flex', flexDirection:'column', gap: '4%', position:'fixed', right:50, zIndex:3 }}>
            <div className="trends blur-container" style={{height:'50%'}}>
                <div className="" style={{backgroundColor:"transparent", padding:30}}>
                    <p style={{textAlign:'left', fontSize:20, fontWeight:'bold'}}>Today's Trends</p>
                    <p style={{textAlign:'left', fontSize:15, color:'#F6B17A'}}>This is top trends we have for
                        today!</p>
                    <br />
                    <div className="wrapper"
                        style={{display:'flex', flexDirection:'column', gap:10, backgroundColor:'transparent'}}>

                        {dataTrends.map((item, index) => (
                        <div className="trend-content" style={{ borderRadius:20, display:'flex', padding:15, gap:15}}>
                            <img src="" style={{width:100, height:50, borderRadius:10}} alt="" />
                            <div className="trend-content-des"
                                style={{display:'flex', flexDirection:'column', alignItems:'start', gap:3 }}>
                                <p style={{fontSize:14,}}>Coquette Design</p>
                                <p style={{fontSize:12, fontStyle:'italic'}}>1500 Posts</p>
                            </div>
                        </div>
                        ))}

                    </div>

                </div>

            </div>

            <div className="activity blur-container" style={{height:'48%'}}>
                <div className="" style={{backgroundColor:'transparent', display:'flex', alignItems:"center", gap:10}}>
                    <p style={{textAlign:'left', fontSize:20, fontWeight:'bold'}}>Your Activities</p>
                    <div className=""
                        style={{padding:10, aspectRatio:1, borderRadius:50, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <p>20</p>
                    </div>
                </div>
                <div className="overflow-scroll" style={{backgroundColor:'transparent'}}>

                    {dataAct.map((item, index) => (
                    <div className="activity-content"
                        style={{ borderRadius:20, backgroundColor:'transparent', display:'flex', padding:15, gap:15}}>
                        <img src="" style={{width:40, aspectRatio:1, borderRadius:100, backgroundColor:'wheat'}}
                            alt="" />
                        <div className="activity-content-des"
                            style={{display:'flex',  backgroundColor:'transparent', flexDirection:'column', alignItems:'start', gap:0 }}>
                            <p style={{fontSize:14,}}>Tom Holland</p>
                            <p style={{fontSize:12, fontStyle:'italic', fontWeight:400}}>Like your post</p>
                        </div>
                    </div>
                    ))}

                </div>


            </div>
        </div>
    </div>

</div>
</div>

)
}

export default Home