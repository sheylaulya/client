import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../style/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

const Album = () => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState([]);
  const [activeContent, setActiveContent] = useState("");
  const { id } = useParams();
  const [userId, setUserId] = useState();


  useEffect(() => {
    fetchData();
  }, []);

  console.log(id);

  const fetchData = async () => {
    const token = localStorage.getItem("token") ?? "";

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get("http://localhost:8800/", config);
      const userData = response.data.user;
      setUserId(userData.UserID);


      const albumResponse = await axios.get(
        "http://localhost:8800/album/user/" + id
      );
      setAlbum(albumResponse.data.album);
      console.log(albumResponse.data.album.AlbumID);

      if (albumResponse.data.album.length > 0) {
        setActiveContent(albumResponse.data.album[0].NamaAlbum);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (AlbumID) => {
    try {
      await axios.delete("http://localhost:8800/album/delete/" + AlbumID);
      console.log("sukses");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(album.UserId);

  return (
    <div>
      <Header />
      <div className="header-break"></div>
      <div className="containers">
        <div
          className="blur-container"
          style={{
            width: "20vw",
            height: "70vh",
            position: "fixed",
            borderRadius: 20,
            padding: 25,
          }}
        >
          <div
            onClick={() => navigate(-1)}
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              marginBottom: 20,
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
            <h3>Your Albums</h3>
          </div>
          {album.map((albumItem) => (
            <div
              className=""
              style={{
                width: "85%",
                height: 30,
                backgroundColor:
                  activeContent === albumItem.NamaAlbum
                    ? "#292B39"
                    : "transparent",
                margin: 10,
                padding: 5,
                paddingLeft: 15,
                borderRadius: 10,
              }}
            >
              <li
                key={albumItem.NamaAlbum}
                style={{
                  backgroundColor: "transparent",
                  fontSize: 18,
                  fontWeight:
                    activeContent === albumItem.NamaAlbum ? "bold" : 500,
                  color:
                    activeContent === albumItem.NamaAlbum ? "#F6B17A" : "white",
                }}
                onClick={() => setActiveContent(albumItem.NamaAlbum)}
              >
                {albumItem.NamaAlbum}
              </li>
            </div>
          ))}
        </div>
        <div className="" style={{ marginLeft: 400 }}>
          {album
            .filter((albumItem) => albumItem.NamaAlbum === activeContent)
            .map((albumItem) => (
              <div
                key={albumItem.AlbumID}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    width:'85%',
                    gap: 5,
                  }}
                >
                  <h1>Album {albumItem.NamaAlbum}</h1>
                  <p
                    style={{
                      color: "#F6B17A",
                      textAlign:"start"
                    }}
                  >
                    {albumItem.Deskripsi}
                  </p>
                  <br />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 15,
                    }}
                  >
                    {albumItem.foto.map((albumFoto) => (
                      <Link
                        to={"/posts/" + albumFoto.FotoID}
                        key={albumFoto.FotoID}
                      >
                        <div className="">
                          <img
                            src={
                              "http://localhost:8800/images/" +
                              albumFoto.LokasiFile
                            }
                            style={{
                              margin: 0,
                              width: 200,
                              aspectRatio: 1 / 1,
                              objectFit: "cover",
                              borderRadius: 10,
                            }}
                            alt=""
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  to=""
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                 {userId === albumItem.User_ID && (

                  <p
                    className="delete"
                    onClick={() => handleDelete(albumItem.AlbumID)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      padding: '10px 15px',
                      borderRadius:10,
                      border: "1px solid red",
                      
                    }}
                  >
                    Delete Album
                  </p>
                 )}

                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Album;
