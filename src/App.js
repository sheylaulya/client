import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";



import { useState } from "react";
import Introduction from "./pages/Introduction";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import UpdateProfile from "./pages/UpdateProfile";
import Album from "./pages/Album";
import Insight from "./pages/Insight";
import AddAlbum from "./pages/AddAlbum";
import Save from "./pages/Save";


function App() { 
  
  return (
    
    <div className="App">
      
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<Introduction />}/>
      <Route path="/regist" element={<Registration />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/posts/:id" element={<Post />}/>
      <Route path="/add-post" element={<AddPost />}/>
      <Route path="/update-profile" element={<UpdateProfile />}/>
      <Route path="/album/:id" element={<Album />}/>
      <Route path="/add-album" element={<AddAlbum />}/>
      <Route path="/insight" element={<Insight />}/>
      <Route path="/save" element={<Save />}/>


     </Routes>
     </ BrowserRouter>
   
</div>
    
  )
}



export default App;
