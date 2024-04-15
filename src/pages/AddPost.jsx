import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [pictName, setPictName] = useState();
  const [pictDesc, setPictDesc] = useState();
  const [userId, setUserId] = useState();
  const [auth, setAuth] = useState(false);
  const [album, setAlbum] = useState([]);
  const [albumSelected, setAlbumSelected] = useState([]);


  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  });

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
      setUserId(userData.UserID);

      const albumResponse = await axios.get(
        "http://localhost:8800/album/user/" + userData.UserID
      );
      setAlbum(albumResponse.data.album);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(album);
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("LokasiFile", file);
    formData.append("JudulFoto", pictName);
    formData.append("DeskripsiFoto", pictDesc);
    formData.append("userID", userId);
    formData.append("AlbumID", albumSelected)

    axios
      .post("http://localhost:8800/upload", formData)
      .then((res) => {
        if (res.data.status === "success") {
          console.log("succeded");
          navigate(-1);
        } else {
          console.log("Failed");
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
          style={{ width: "75%", margin: "auto", height: "65vh" }}
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
            <h3>Add Post</h3>
          </div>

          <div className="form-upload" style={{ display: "flex", gap: "40px" }}>
            <div className="left-content">
              <div>
                <div
                  className="add-pics"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px dashed white",
                    width: 400,
                    aspectRatio: 1 / 1,
                    cursor: "pointer",
                  }}
                  onClick={() => document.querySelector(".file-input").click()}
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="file-input"
                    onChange={handleFile}
                  />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        style={{
                          width: 380,
                          aspectRatio: 1 / 1,
                          objectFit: "cover",
                          borderRadius: 20,
                        }}
                      />
                    ) : (
                      <>
                        <Icon
                          icon="ep:upload-filled"
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                            fontSize: 100,
                          }}
                        />
                        <p>Tap to Upload File</p>
                      </>
                    )}
                  </div>
                </div>

                {selectedFile && <div></div>}
              </div>
            </div>

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
                placeholder="Post Title"
                onChange={(e) => {
                  setPictName(e.target.value);
                }}
              />

              <textarea
                name=""
                id=""
                cols="50"
                rows="5"
                placeholder="Post Description"
                onChange={(e) => {
                  setPictDesc(e.target.value);
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 20,
                  fontSize: 16,
                }}
              ></textarea>
              <select
                name=""
                placeholder=""
                id=""
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  padding: 10,
                  height: 50,
                  fontSize: 16,
                }}
                onChange={(e) => {
                  setAlbumSelected(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Album
                </option>
                {album.map((album) => (
                  <option
                    key={album.AlbumID}
                    value={album.AlbumID}
                    style={{ backgroundColor: "white" }}
                  >
                    {album.NamaAlbum}
                  </option>
                ))}
              </select>

              <div
                className=""
                style={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "end",
                }}
              >
                <button style={{ width: "100%" }} onClick={handleUpload}>
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

export default AddPost;
