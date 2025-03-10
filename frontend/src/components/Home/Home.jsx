import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import UseSocketGetMessage from "../../context/UseGetSocketMessage";
function Home() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const [chats, setChats] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    const recentChats = async (req, res) => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/message/recent-chats",
          {
            withCredentials: true,
          }
        );
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    recentChats();
  }, []);

  return (
    <div style={{ width: "100%" }}>
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
        <input type="search" required placeholder="Search" />
      </label>

      <div className="  p-4" style={{ width: "100%" }}>
        <h2 className="text-2xl font-semibold mb-4 text-center float-start">
          Recent Chats
        </h2>
        <ul className=" w-full space-y-2" style={{ width: "100%" }}>
          {chats.map((chat, index) => (
            <li
              key={index}
              className="w-full bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition duration-300 cursor-pointer "
              onClick={() => {
                navigate(`/chat/${chat.member._id}`);
              }}
            >
              <div>
                <strong className="text-lg text-gray-100">
                  {chat.member.name}
                </strong>
                <p className="text-sm text-gray-600">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
