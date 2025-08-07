import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
// import man from "../../../public/man.jpg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { conversationActions } from "../../../Slice/ConversationSlice";
import axios from "axios";
import toast from "react-hot-toast";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  const handleNavClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    await axios.get("https://chat-app-ob0w.onrender.com/user/logout", {
      withCredentials: true,
    });
    localStorage.setItem("isAuth", false);
    dispatch(conversationActions.setUser(null));
    localStorage.setItem("user", null);
    navigate("/login");
  };
  // const handleFileChange = async (e) => {
  //   if (!isAuthorized) {
  //     return navigate("/login");
  //   }
  //   const file = e.target.files[0]; // Get the file directly
  //   const yess = confirm("Are you sure you want to upload this file?");
  //   if (yess) {
  //     const fm = new FormData();
  //     fm.append("profile", file);
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4000/user/profileChange",
  //         fm,
  //         { withCredentials: true }
  //       );
  //       dispatch(userAction.setProfile(response.data.profile));
  //       audio.play();
  //       toast.success(response.data.message);
  //       dispatch(userAction.setUser(response.data.user));
  //       localStorage.getItem("user", response.data.user);
  //     } catch (error) {
  //       toast.error(error.response.data);
  //     }
  //   }
  // };
  return (
    <>
      <div className="fixed top-0 md:hidden z-50 bg-gray-800 w-full h-14 flex items-center px-4">
        <button onClick={toggleSidebar} className="p-3 text-white rounded-full">
          <FiMenu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-50`}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-end md:hidden">
          <button onClick={toggleSidebar}>
            <FiX size={24} className="text-white" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mt-4">
          <img
            src="/man.jpg"
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
          {/* <label
            htmlFor="file-input"
            style={{
              fontSize: "19px",
              position: "absolute",
              top: "80px",
              left: "67px",
              backgroundColor: "teal",
              borderRadius: "50%",
            }}
          >
            <IoAddOutline />
          </label> */}
          {/* <input
            type="file"
            name="profile"
            style={{ display: "none" }}
            id="file-input"
            onChange={handleFileChange}
          /> */}
          <p className="text-white">{user?.username}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-3">
          <NavLink
            to="/"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname === "/" ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            Home Page
          </NavLink>
          <NavLink
            to="/followers"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/followers") ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            Followers
          </NavLink>
          <NavLink
            to="/following"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/following") ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            Following
          </NavLink>
          <NavLink
            to="/request"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/request") ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            Follow Requests
          </NavLink>
          <NavLink
            to="/sent"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/sent") ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            Your Requested
          </NavLink>
          <NavLink
            to="/allUsers"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/allUsers") ? "bg-gray-800" : ""
            }`}
            onClick={handleNavClick}
          >
            All Users
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Sidebar;
