import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Users from "./Users.jsx";
function Sent() {
  const [sentRequest, setSentRequest] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          "https://chat-app-ob0w.onrender.com/user/getSentRequests",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setSentRequest(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div>
      {" "}
      {sentRequest.length === 0 ? (
        <h2>you havent sent request to any user </h2>
      ) : (
        <Users users={sentRequest} />
      )}
    </div>
  );
}

export default Sent;
