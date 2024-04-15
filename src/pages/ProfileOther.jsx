import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { Icon } from '@iconify/react/dist/iconify.js';

const ProfileOther = () => {
    const navigate = useNavigate();

    const [activeContent, setActiveContent] = useState("posts");
  
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [bDay, setBDay] = useState();
    // const [id, setId] = useState("");
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [album, setAlbum] = useState([]);
  
  
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = async () => {
      const token = localStorage.getItem("token") ?? "";
  
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      try {
        const response = await axios.get("http://localhost:8800/profile/", id);
        const userData = response.data.user;
  
        console.log(id)
  
        setAuth(true);
        setName(userData.Username);
        setFullName(userData.NamaLengkap);
        setLocation(userData.Alamat);
        // setId(userData.UserID);
        setBio(userData.Bio);
  
        if (userData.TanggalLahir) {
          const parsedDate = moment(userData.TanggalLahir);
          const monthName = parsedDate.format("MMMM");
          const formattedDate = monthName + ", " + parsedDate.format("DD");
          setBDay(formattedDate);
        }
  
        setPosts(response.data.post);
        setLikedPosts(response.data.likePost);
  
      
        const albumResponse = await axios.get(
          "http://localhost:8800/album/user/" + userData.UserID
        );
        setAlbum(albumResponse.data.album);
        // setAlbumFoto(albumResponse.data.album.foto);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(album.foto);
  
  
  
    return (
      <div>
        <Header />
        <div className="containers">
          <div className="header-break"></div>
  
          <div
            onClick={() => navigate(-1)}
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <Icon
              icon="ic:round-arrow-back"
              style={{
                color: "white",
                fontSize: 20,
                backgroundColor: "transparent",
              }}
            />
            <h3>User Profile</h3>
          </div>
  
          <br />
          <div
            className="profile-head blur-container"
            style={{
              height: 200,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 40,
            }}
          >
            {avatar ? (
              <img
                src=""
                style={{ width: 180, aspectRatio: 1, borderRadius: "50%" }}
                alt=""
              />
            ) : (
              <Icon
                className="avatar"
                style={{
                  backgroundColor: "transparent",
                  width: 180,
                  height: 180,
                  borderRadius: 200,
                  color: "white",
                }}
                icon="ion:person-sharp"
              />
            )}
            <div
              className="prof-info"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                height: 150,
                width: 750,
                gap: 10,
              }}
            >
              <p
                className="full-name"
                style={{ fontSize: 24, fontWeight: "bold" }}
              >
                {fullName}
              </p>
              <p
                className="username"
                style={{ textAlign: "start", fontWeight: 400 }}
              >
                @{name}
              </p>
              <p className="bio" style={{ textAlign: "start", fontWeight: 400 }}>
                {bio}
              </p>
  
              <div className="" style={{ display: "flex", gap: 15 }}>
                <div
                  className=""
                  style={{ backgroundColor: "transparent", display: "flex" }}
                >
                  <Icon
                    className="icon-nav"
                    style={{ backgroundColor: "transparent", color: "white" }}
                    icon="tabler:ballon"
                  />
                  <p
                    className="b-date"
                    style={{ textAlign: "start", fontWeight: 400 }}
                  >
                    {bDay}
                  </p>
                </div>
                <div
                  className=""
                  style={{ backgroundColor: "transparent", display: "flex" }}
                >
                  <Icon
                    className="icon-nav"
                    style={{ backgroundColor: "transparent", color: "white" }}
                    icon="mdi:location"
                  />
                  <p
                    className="b-date"
                    style={{ textAlign: "start", fontWeight: 400 }}
                  >
                    {location}
                  </p>
                </div>
              </div>
            </div>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "start",
                height: "100%",
                width: 200,
                gap: 10,
              }}
            >
              <Icon
                onClick={() => navigate("/update-profile")}
                icon="mingcute:user-edit-fill"
                className="avatar"
                style={{
                  backgroundColor: "transparent",
                  width: 30,
                  height: 30,
                  borderRadius: 200,
                  color: "white",
                  cursor: "pointer",
                }}
              ></Icon>
              <Icon
                onClick={() => navigate("/insight")}
                icon="material-symbols:search-insights-rounded"
                className="avatar"
                style={{
                  backgroundColor: "transparent",
                  width: 30,
                  height: 30,
                  borderRadius: 200,
                  color: "white",
                  cursor: "pointer",
                }}
              ></Icon>
            </div>
            {/* <div className="" style={{height:180}}>
  
            <div
              onClick={() => navigate("/update-profile")}
              className=""
              style={{
                cursor: "pointer",
                height: 50,
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "start",
              }}
            >
              <p
                style={{
                  width: 150,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Edit Profile
              </p>
            </div>
            <div
              onClick={() => navigate("/update-profile")}
              className=""
              style={{
                cursor: "pointer",
                height: 50,
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "start",
              }}
            >
              <p
                style={{
                  width: 150,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Account Insight
              </p>
            </div>
           </div> */}
          </div>
          <br />
          <ul style={{ display: "flex", gap: 50, justifyContent: "center" }}>
            <li
              style={{
                fontSize: 18,
                fontWeight: activeContent === "posts" ? "bold" : 500,
                color: activeContent === "posts" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("posts")}
            >
              Posts
            </li>
            <li
              style={{
                fontSize: 18,
                fontWeight: activeContent === "album" ? "bold" : 500,
                color: activeContent === "album" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("album")}
            >
              Album
            </li>
            <li
              style={{
                fontSize: 18,
                fontWeight: activeContent === "likes" ? "bold" : 500,
                color: activeContent === "likes" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("likes")}
            >
              Likes
            </li>
            {/* <li
              style={{
                fontSize: 18,
                fontWeight: activeContent === "following" ? "bold" : 500,
                color: activeContent === "following" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("following")}
            >
              Following
            </li>
            <li
              style={{
                fontSize: 18,
                fontWeight: activeContent === "follower" ? "bold" : 500,
                color: activeContent === "follower" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("follower")}
            >
              Follower
            </li> */}
          </ul>
  
          {activeContent === "posts" && (
            <div>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ color: "white" }}>{posts.length + " Posts"}</h3>
                <div
                  className=""
                  onClick={() => navigate("/add-post")}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    padding: 8,
                    width: 120,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      fontSize: 20,
                    }}
                    icon="mingcute:add-fill"
                  />
                  <p
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Add Post
                  </p>
                </div>
              </div>
              <br />
  
              <div className="wrapper-profile" style={{ width: "100%" }}>
                {posts.map((posts) => (
                  <Link to={"/posts/" + posts.FotoID}>
                    {" "}
                    <div
                      className="card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <img
                        src={"http://localhost:8800/images/" + posts.LokasiFile}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 20,
                          backgroundColor: "white",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
  
          {activeContent === "album" && (
            <div>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ color: "white" }}>{album.length + " Album"}</h3>
                <div
                  className=""
                  onClick={() => navigate("/add-post")}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    display: "flex",
                    padding: 8,
                    width: 120,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      fontSize: 20,
                    }}
                    icon="mingcute:add-fill"
                  />
                  <p
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Add Album
                  </p>
                </div>
              </div>
              <br />
  
              <div className="wrapper-profile" style={{ width: "100%" }}>
              {album.map((albumItem) => (
      <Link to={`/album/${albumItem.AlbumID}`} key={albumItem.AlbumID}>
          <div
              className=""
              style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
              }}
          >
              <div
                  className="blur-container"
                  style={{
                      padding: 10,
                      objectFit: "contain",
                      width: 200,
                      // height: 200,
                      aspectRatio: 1 / 1,
                      borderRadius: 20,
                      gap: 5,
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "start",
                  }}
              >
                  {albumItem.foto.map((photo) => (
                      <div key={photo.FotoID}>
                          <img
                              src={"http://localhost:8800/images/" + photo.LokasiFile}
                              style={{
                                  margin: 0,
                                  width: 95,
                                  aspectRatio: 1 / 1,
                                  objectFit: "cover",
                                  borderRadius: 10,
                              }}
                              alt=""
                          />
                      </div>
                  ))}
              </div>
              <p>Album {albumItem.NamaAlbum}</p>
          </div>
      </Link>
  ))}
  
              </div>
            </div>
          )}
  
          {activeContent === "likes" && (
            <div>
              <br />
              <div className="wrapper-profile" style={{ width: "100%" }}>
                {likedPosts.map((likedPosts) => (
                  <Link to={"/posts/" + likedPosts.FotoID}>
                    {" "}
                    <div
                      className="card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <img
                        src={
                          "http://localhost:8800/images/" + likedPosts.LokasiFile
                        }
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 20,
                          backgroundColor: "white",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      <div
                        className=""
                        style={{ display: "flex", alignItems: "center", gap: 10 }}
                      >
                        <div className="acc-img">
                          {avatar ? ( // Jika src memiliki nilai
                            <img
                              style={{ width: 15, height: 15, borderRadius: 200 }}
                              src=""
                              alt=""
                            />
                          ) : (
                            // Jika src tidak memiliki nilai
                            <Icon
                              className="avatar"
                              style={{
                                backgroundColor: "transparent",
                                width: 15,
                                height: 15,
                                borderRadius: 200,
                                color: "white",
                              }}
                              icon="ion:person-sharp"
                            />
                          )}
                        </div>
                        <p
                          style={{ fontSize: 14, width: 100, textAlign: "start" }}
                        >
                          {likedPosts.Username}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default ProfileOther