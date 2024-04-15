import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

const AddAlbum = () => {
  const navigate = useNavigate();

  const [namaAlbum, setNamaAlbum] = useState();
  const [descAlbum, setDescAlbum] = useState();
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState("");
  const [selectedPosts, setSelectedPosts] = useState([]);


  useEffect(() => {
    fetchData();
  }, [id]);
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

      setAuth(true);
      setId(userData.UserID);
      setPosts(response.data.post);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault(); 

    const data = {
      namaAlbum : namaAlbum,
      descAlbum: descAlbum,
      UserID: id,
      selectedPosts: selectedPosts
    };  

    axios
      .post("http://localhost:8800/add-album", data) // Send updated user information in the request body
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Update succeeded");
          navigate(-1)
        } else {
          console.log("Update failed");
          // Handle failure, if needed
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <Header />
      <div className="header-break"></div>
      <br />
      <div className="containers">
        <div
          className="blur-container post-content"
          style={{ width: "50%", margin: "auto" }}
        >
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
            <h3>Add Album</h3>
          </div>

          <div className="form-upload" style={{ display: "flex", gap: "40px" }}>
            <div
              className="right-content"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <input
                type="text"
                placeholder="Album Title"
                onChange={(e) => {
                  setNamaAlbum(e.target.value);
                }}
              />

              <textarea
                name=""
                id=""
                cols="50"
                rows="5"
                placeholder="Album Description"
                onChange={(e) => {
                  setDescAlbum(e.target.value);
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 20,
                  fontSize: 16,
                }}
              ></textarea>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <h4>Choose Post To Added To Your Album</h4>
                <p style={{ fontSize: 13, color: "#F6B17A" }}>
                  You must add at least 1 of your post!
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  width: "100%",
                }}
              >
                {posts.map((posts) => (
                  <label
                    key={posts.FotoID}
                    style={{ display: "flex", alignItems: "start" }}
                  >
                  <input
  type="checkbox"
  value={posts.FotoID}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((id) => id !== value)
        : [...prevSelected, value]
    );
  }}
  style={{
    position: "relative",
    left: 25,
    borderRadius: "50%",
  }}
/>

                    <img
                      src={"http://localhost:8800/images/" + posts.LokasiFile}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </label>
                ))}
              </div>

              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "end",
                }}
              >
                <button
                  style={{ width: "100%" }}
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlbum;
