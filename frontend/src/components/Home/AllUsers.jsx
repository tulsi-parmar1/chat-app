import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Users from "./Users";

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/user/getUsers",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {users.length === 0 ? (
        <h2>no users</h2>
      ) : (
        <Users users={users} route={"allUsers"} />
      )}
    </div>
  );
}

export default AllUsers;
