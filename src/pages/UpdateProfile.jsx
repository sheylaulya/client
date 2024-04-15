import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import moment from 'moment';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState();

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [bDay, setBDay] = useState();

  
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");
  
  const [message, setMessage] = useState("");
  
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };
  
  
  
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
    axios
      .get("http://localhost:8800/", config)
      .then((res) => {
        if (res.data.status === "success") {
          setAuth(true);
          setName(res.data.user.Username);
        setFullName(res.data.user.NamaLengkap);
        setLocation(res.data.user.Alamat);
        setId(res.data.user.UserID)
setBio(res.data.user.Bio)
if (res.data && res.data.user && res.data.user.TanggalLahir) {
  const formattedDate = moment(res.data.user.TanggalLahir).format("YYYY-MM-DD");
  setBDay(formattedDate);
}

console.log(bDay)
       
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Prepare the updated user information
    const updatedUser = {
      UserID : id,
      NamaLengkap: fullName,
      Alamat: location,
      Bio: bio,
      TanggalLahir: bDay
    };
  
    axios
      .put("http://localhost:8800/user/update", updatedUser) // Send updated user information in the request body
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
    <div>
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
            <h3>Update Profile</h3>
          </div>
          <div className="" style={{ display: "flex", gap: 10 }}>
            <div className="left-content">
              <div
                className="add-pics"
                style={{
                  backgroundColor: "transparent",
                  border: "1px dashed white",
                  width: 400,
                  aspectRatio: 1 / 1,
                  cursor: "pointer",
                  borderRadius: "50%",
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
                        borderRadius: "50%",
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

                {selectedFile && <div></div>}
              </div>
            </div>
            <div
              className="right-content"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 15,
              }}
            >
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div
                  className=""
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <label htmlFor="">Username</label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Username"
                    value={name}
                    disabled="true"
                  />
                </div>
                <div
                  className=""
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <label htmlFor="">Full Name</label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Post Title"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div
                  className=""
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <label htmlFor="">Birth Date</label>
                  <input
                    style={{ width: "100%" }}
                    type="date"
                    placeholder="Birth Date"
                    value={bDay}
                       onChange={(e) => {
                      setBDay(e.target.value);
                    }}
                  />
                </div>
                <div
                  className=""
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <label htmlFor="">Location</label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 30,
                  gap: 5,
                }}
              >
                <label htmlFor="">Bio</label>
                <textarea
                  name=""
                  id=""
                  cols="50"
                  rows="3"
                  placeholder="Bio"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  value={bio}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 20,
                    fontSize: 16,
                  }}
                ></textarea>
              </div>
              
              <button
                style={{ width: "95%", marginLeft: 30 }}
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
