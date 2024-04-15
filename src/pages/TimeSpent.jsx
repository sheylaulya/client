import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeSpent = () => {
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [loginTime, setLoginTime] = useState(null);
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchLoginTime = async () => {
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

        const getLogTime = await axios.get(
          "http://localhost:8800/login-history/" + userData.UserID
        );
        setLoginTime(getLogTime.data.loginHistory);

        if (getLogTime.data.loginHistory.length > 0) {
          setStartTime(
            new Date(getLogTime.data.loginHistory[0].Login_Time).getTime()
          );
        } else {
          setStartTime(Date.now());
        }
      } catch (error) {
        console.error("Error fetching login time:", error);
        setStartTime(Date.now());
      }
    };

    fetchLoginTime();
  }, []);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeSpent(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
    //   <div
    //     className="time"
    //     style={{ display: "flex", flexDirection: "column", justifyContent:"start", alignItems:"start" }}
    //   >
    //     <h4 className="hours" style={{ backgroundColor: "transparent" }}>
    //       <span style={{ backgroundColor: "transparent", color: "#F6B17A" }}>
    //         {hours}{" "}
    //       </span>
    //       hour{hours !== 1 ? "s" : ""}{" "}
    //     </h4>
    //     <h4 className="minutes" style={{ backgroundColor: "transparent" }}>
    //       <span style={{ backgroundColor: "transparent", color: "#F6B17A" }}>
    //         {minutes}{" "}
    //       </span>
    //       Minute{minutes !== 1 ? "s" : ""}{" "}
    //     </h4>   
    //     <h4 className="seconds" style={{ backgroundColor: "transparent" }}>
    //       <span style={{ backgroundColor: "transparent", color: "#F6B17A" }}>
    //         {seconds}{" "}
    //       </span>
    //       Second{seconds !== 1 ? "s" : ""}{" "}
    //     </h4>
    //   </div>
    <div className="time">
      <span className="hours" style={{ backgroundColor: "transparent", color: "#F6B17A" }}>{hours}</span> hour{hours !== 1 ? "s" : ""}{" "}
      <span className="minutes" style={{ backgroundColor: "transparent", color: "#F6B17A" }}>{minutes}</span> minute{minutes !== 1 ? "s" : ""}{" "}
      <span className="seconds" style={{ backgroundColor: "transparent", color: "#F6B17A" }}>{seconds}</span> second{seconds !== 1 ? "s" : ""}
    </div>
    );
  };

  return <h4>{startTime ? formatTime(timeSpent) : "Loading..."}</h4>;
};

export default TimeSpent;
