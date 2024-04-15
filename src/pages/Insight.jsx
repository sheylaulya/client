import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import TimeSpent from "./TimeSpent";
import AccountVisit from "./AccountVisit";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartComponent from "./component/chartData";
import ExportPDF from "./ExportPDF";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Insight = () => {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("overall");
  const [auth, setAuth] = useState(false);
  const [totalLikeAll, setTotalLikeAll] = useState();
  const [totalSaveAll, setTotalSaveAll] = useState();

  const [totalUploadAll, setTotalUploadAll] = useState();

  // const componentPDF = useRef();

  // const generatePDF = useReactToPrint({
  //   content: ()=> componentPDF.current,
  //   documentTitle: "Exportnihbos",
  // })

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

      setAuth(true);

      const insightData = await axios.get(
        "http://localhost:8800/insight/" + userData.UserID
      );
      setTotalLikeAll(insightData.data.totalLike);
      setTotalSaveAll(insightData.data.totalSaves);
      setTotalUploadAll(insightData.data.totalUpload);
      //   console.log(totalLikeAll);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(totalSaveAll);

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
            <h3>Insight Overview</h3>
          </div>

          <div
            className=""
            style={{
              width: "85%",
              height: 30,
              backgroundColor:
                activeContent === "overall" ? "#292B39" : "transparent",
              margin: 10,
              padding: 5,
              paddingLeft: 15,
              borderRadius: 10,
            }}
          >
            <li
              style={{
                fontSize: 18,
                backgroundColor: "transparent",
                fontWeight: activeContent === "overall" ? "bold" : 500,
                color: activeContent === "overall" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("overall")}
            >
              Overall
            </li>
          </div>
          <div
            className=""
            style={{
              width: "85%",
              height: 30,
              backgroundColor:
                activeContent === "monthly" ? "#292B39" : "transparent",
              margin: 10,
              padding: 5,
              paddingLeft: 15,
              borderRadius: 10,
            }}
          >
            <li
              style={{
                fontSize: 18,
                backgroundColor: "transparent",
                fontWeight: activeContent === "monthly" ? "bold" : 500,
                color: activeContent === "monthly" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("monthly")}
            >
              monthly
            </li>
          </div>
          <div
            className=""
            style={{
              width: "85%",
              height: 30,
              backgroundColor:
                activeContent === "weekly" ? "#292B39" : "transparent",
              margin: 10,
              padding: 5,
              paddingLeft: 15,
              borderRadius: 10,
            }}
          >
            <li
              style={{
                fontSize: 18,
                backgroundColor: "transparent",
                fontWeight: activeContent === "weekly" ? "bold" : 500,
                color: activeContent === "weekly" ? "#F6B17A" : "white",
              }}
              onClick={() => setActiveContent("weekly")}
            >
              weekly
            </li>
          </div>
        </div>
        <div
          className=""
          style={{
            marginLeft: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 15,
          }}
        >
          <div className="" style={{ display: "flex", gap: 20 }}>
            <div
              className="blur-container"
              style={{
                width: 180,
                height: 100,
                padding: 15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <p>Total Time Spend</p>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon
                  icon="fluent:time-and-weather-20-regular"
                  style={{
                    backgroundColor: "transparent",
                    width: 50,
                    height: 50,
                    color: "white",
                  }}
                ></Icon>
                <div className="" style={{ width: 100 }}>
                  <TimeSpent />
                </div>
              </div>
            </div>
            <div
              className="blur-container"
              style={{
                width: 180,
                height: 100,
                padding: 15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <p>Total Like Post</p>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon
                  icon="fluent:board-heart-24-regular"
                  style={{
                    backgroundColor: "transparent",
                    width: 50,
                    height: 50,
                    color: "white",
                  }}
                ></Icon>
                {totalLikeAll && totalLikeAll.length > 0 ? (
                  totalLikeAll.map((totalLikes, index) => (
                    <h1
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        color: "#F6B17A",
                      }}
                    >
                      {totalLikes.totalLikeCount}
                    </h1>
                  ))
                ) : (
                  <h1
                    style={{
                      backgroundColor: "transparent",
                      color: "#F6B17A",
                    }}
                  >
                    {console.log("totalLikeAll:", totalLikeAll)}0
                  </h1>
                )}
              </div>
            </div>
            <div
              className="blur-container"
              style={{
                width: 180,
                height: 100,
                padding: 15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: 15,
              }}
            >
              <p>Total Saved Post</p>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Icon
                  icon="oui:app-saved-objects"
                  style={{
                    backgroundColor: "transparent",
                    width: 45,
                    height: 45,
                    color: "white",
                  }}
                ></Icon>
                {totalSaveAll &&
                  Array.isArray(totalSaveAll) &&
                  totalSaveAll.map((totalSaves, index) => (
                    <h1
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        color: "#F6B17A",
                      }}
                    >
                      {totalSaves.totalSaveCount}
                    </h1>
                  ))}
              </div>
            </div>
            <div
              className="blur-container"
              style={{
                width: 180,
                height: 100,
                padding: 15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <p>Total Upload Post</p>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon
                  icon="typcn:upload-outline"
                  style={{
                    backgroundColor: "transparent",
                    width: 50,
                    height: 50,
                    color: "white",
                  }}
                ></Icon>
                {totalUploadAll &&
                  Array.isArray(totalUploadAll) &&
                  totalUploadAll.map((totalUpload, index) => (
                    <h1
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        color: "#F6B17A",
                      }}
                    >
                      {totalUpload.totalUploadCount}
                    </h1>
                  ))}
              </div>
            </div>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
            }}
          >
            <h3>Total Account Visitor</h3>
            <button style={{ width: 140, height: 35 }}>Export Data</button>
          </div>
          {/* <Line options={options} data={ChartComponent} /> */}
          <ChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Insight;
