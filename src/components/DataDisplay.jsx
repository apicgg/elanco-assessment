import axios from "axios";
import React, { useEffect, useState } from "react";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const API_URL = "https://engineering-task.elancoapps.com/api/raw";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setData(response.data);
    };
    fetchData();
  }, [API_URL]);

  // Sorts as per the date
  /*
  const sortedData = data.sort((item1, item2) => {
    const dateA = new Date(item1.Date).getTime();
    const dateB = new Date(item2.Date).getTime();
    return dateB - dateA;
  });
  */

  // Sorts as per the cost
  const sortedData = data.sort((item1, item2) => item2.Cost - item1.Cost);

  const handleAppNameClick = async (applicationName) => {
    const response = await axios.get(
      `https://engineering-task.elancoapps.com/api/applications/${applicationName}`
    );
    setSelectedApp(response.data);
    // console.log(response.data);
  };

  return (
    <>
      {selectedApp == null ? (
        <table>
          <thead>
            <tr>
              <th>App Name</th>
              <th>Costs</th>
              <th>Environment</th>
              <th>Resource Group</th>
              <th>Resource Location</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    onClick={() => handleAppNameClick(item.Tags["app-name"])}
                  >
                    {item.Tags["app-name"]}
                  </button>
                </td>
                <td>${item.Cost}</td>
                <td>{item.Tags["environment"]}</td>
                <td>{item.ResourceGroup}</td>
                <td>{item.ResourceLocation}</td>
                <td>{item.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>App Name</th>
              <th>Costs</th>
              <th>Environment</th>
              <th>Resource Group</th>
              <th>Resource Location</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {selectedApp.map((item, index) => (
              <tr key={index}>
                <td>{item.Tags["app-name"]}</td>
                <td>${item.Cost}</td>
                <td>{item.Tags["environment"]}</td>
                <td>{item.ResourceGroup}</td>
                <td>{item.ResourceLocation}</td>
                <td>{item.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DataDisplay;
