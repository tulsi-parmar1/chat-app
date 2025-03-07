import React, { use } from "react";
import axios from "axios";
import Users from "./Users.jsx";
import { useState, useEffect } from "react";
function Followers() {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/user/getFollowers",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setFollowers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {followers.length === 0 ? (
        <h2>no one follows you </h2>
      ) : (
        <Users users={followers} setUsers={setFollowers} route={"followers"} />
      )}
    </div>
  );
}

export default Followers;
