import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

const Save = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [saves, setSave] = useState([]);
  const [imgDetail, setImgDetail] = useState([]);


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
      const response = await axios.get("http://localhost:8800/", config);
      const userData = response.data.user;
      setUserId(userData.UserID);

      const responseSave = await axios.get(
        "http://localhost:8800/save/detail/" + userData.UserID
      );
      const saveData = responseSave.data;

      setSave(saveData.getSaveDetail);
      setImgDetail(saveData.getImageDetails)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(userId);
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
          <h3>Your Saved Posts</h3>
        </div>

        <br />
        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h1>
            This is your <span style={{ color: "#F6B17A" }}>saved</span> Posts!
          </h1>
          <h3>
            You have
            <span style={{ color: "#F6B17A" }}> {saves.length}</span> Saved
            Posts
          </h3>
        </div>
        <br />
        <div
          className=""
          style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 30 }}
        >
          {imgDetail.map((saveItem) => (
            <Link to={"/posts/" + saveItem.FotoID}>
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
                  src={"http://localhost:8800/images/" + saveItem.LokasiFile}
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
                    {saveItem.avatar ? ( // Jika src memiliki nilai
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
                  <p style={{ fontSize: 14, width: 100, textAlign: "start" }}>
                    {saveItem.Username}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
