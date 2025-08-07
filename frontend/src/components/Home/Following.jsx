import React, { useEffect, useState } from "react";
import axios from "axios";
import Users from "./Users.jsx";

function Following() {
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          "https://chat-app-ob0w.onrender.com/user/getFollowing",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setFollowing(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div>
      <div className="mb-10 w-full" style={{ width: "100% " }}>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            style={{ width: "100%" }}
          />
        </label>
      </div>
      {following.length === 0 ? (
        <h2>you haven't follow any user yet</h2>
      ) : (
        <Users users={following} setUsers={setFollowing} route={"following"} />
      )}
    </div>
  );
}

export default Following;
