import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tulsi from "../../../public/tulsi.jpg";
import { socketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

function Users({ users, setUsers, route }) {
  const loggedinuser = JSON.parse(localStorage.getItem("user"));
  console.log(loggedinuser);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { socket } = useContext(socketContext);
  const { onlineUser } = useContext(socketContext);

  const handlefollow = async (userId) => {
    // try {
    //   const { data } = await axios.get(
    //     `http://localhost:4000/user/sendFollowRequest/${userId}`,
    //     { withCredentials: true },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(data);
    //   localStorage.setItem("user", JSON.stringify(data));
    //   const data2 = await axios.get(
    //     `http://localhost:4000/user/getUser`,
    //     { withCredentials: true },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(data2.data);
    //   localStorage.setItem("user", JSON.stringify(data2.data));
    //   setUser(data2.data);
    // } catch (error) {
    //   console.log(error);
    // }
    socket.emit("followRequest", { id: userId, userId: loggedinuser._id });

    socket.on("sendrequest", (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast.success("request sent succesfully!");
    });
  };
  const handleRequested = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/backRequest/${userId}`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      const data2 = await axios.get(
        `http://localhost:4000/user/getUser`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data2.data);

      localStorage.setItem("user", JSON.stringify(data2.data));
      setUser(data2.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleunflw = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/unfollowUser/${userId}`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
      console.log(data);
      const data2 = await axios.get(
        `http://localhost:4000/user/getUser`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data2.data);

      localStorage.setItem("user", JSON.stringify(data2.data));
      setUser(data2.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRequestAccept = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/acceptRequest/${userId}`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      // setUsers(users.filter((user) => user._id !== userId));
      const data2 = await axios.get(
        `http://localhost:4000/user/getUser`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data2.data);

      localStorage.setItem("user", JSON.stringify(data2.data));
      setUser(data2.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRequestReject = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/rejectRequests/${userId}`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setUsers(users.filter((user) => user._id !== userId));
      const data2 = await axios.get(
        `http://localhost:4000/user/getUser`,
        { withCredentials: true },
        {
          withCredentials: true,
        }
      );
      console.log(data2.data);
      localStorage.setItem("user", JSON.stringify(data2.data));
      setUser(data2.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlechat = async (userId) => {
    navigate(`/${route}/chat/${userId}`);
  };
  console.log(loggedinuser);
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 border-white border-2 rounded-lg mb-2"
          >
            <div className="flex items-center relative">
              <img
                src={tulsi}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
              />
              <div
                className={`${
                  onlineUser.includes(user._id) &&
                  loggedinuser.following.includes(user._id) &&
                  "bg-green-600 rounded-3xl h-3 w-3 absolute left-9 bottom-8"
                }`}
              ></div>
              <div className="ml-2">
                <h2 className="text-lg font-semibold">{user.username}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            {loggedinuser.following.includes(user._id) &&
            !loggedinuser.followRequests.includes(user._id) ? (
              <div>
                <button
                  className="px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleunflw(user._id)}
                >
                  following
                </button>
                <button
                  className="px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                  onClick={() => handlechat(user._id)}
                >
                  chat
                </button>
              </div>
            ) : loggedinuser.sentRequests.includes(user._id) ? (
              <button
                className="px-3 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                onClick={() => handleRequested(user._id)}
              >
                requested
              </button>
            ) : loggedinuser.followRequests.includes(user._id) ? (
              <div>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleRequestAccept(user._id)}
                >
                  accept
                </button>

                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleRequestReject(user._id)}
                >
                  Reject
                </button>
              </div>
            ) : (
              <button
                className="px-3 py-1 bg-teal-500 text-white rounded-full hover:bg-gray-800 cursor-pointer"
                onClick={() => handlefollow(user._id)}
              >
                follow
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Users;
