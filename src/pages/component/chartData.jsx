import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const visitCounts = Array.from({ length: 12 }).fill(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") ?? "";

      const config = {
        headers: {
          Authorization: token,
        },
      };

      try {
        const responseUser = await axios.get("http://localhost:8800/", config);
        const userData = responseUser.data.user;

        // Fetch data from the database
        const response = await axios.get(
          "http://localhost:8800/insight/" + userData.UserID
        );
        const dbData = response.data.profileVisit;
        dbData.forEach((entry) => {
            visitCounts[entry.month - 1] = entry.visitCount;
          });

        // Format the fetched data for Chart.js
        const formattedData = {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Account Visitor Data",
                data: visitCounts,
                borderColor: "#F6B17A",
              },
            ],
          };

        setChartData(formattedData); // Update the state with the formatted data
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to convert month number to month name
  const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1]; // Months array is zero-indexed
  };

  return (
    <div style={{width: '60vw', height:'100%'}}>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              y: {
                precision: 1, 
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
