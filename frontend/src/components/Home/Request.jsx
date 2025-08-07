import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "../../../../backend/models/user.model";
import Users from "./Users";

function Request() {
  const [followRequests, setFollowRequests] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          "https://chat-app-ob0w.onrender.com/user/getFollowRequests",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setFollowRequests(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div>
      {followRequests.length === 0 ? (
        <h2>no follow requests</h2>
      ) : (
        <Users users={followRequests} setUsers={setFollowRequests} />
      )}
    </div>
  );
}

export default Request;
