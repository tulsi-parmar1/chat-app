// import React, { useEffect, useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import tulsi from "../../../public/tulsi.jpg";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import Loading from "./Loading";
// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuth = localStorage.getItem("isAuth") === "true";
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeSidebar = (e) => {
//     if (e.target.id === "overlay") {
//       setIsOpen(false);
//     }
//   };
//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/login");
//     }
//   }, []);
//   const handleLogout = async () => {
//     const { data } = await axios.get("http://localhost:4000/user/logout", {
//       withCredentials: true,
//     });
//     localStorage.setItem("isAuth", false);
//     localStorage.setItem("user", null);
//     navigate("/login");
//   };
//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <div className="p-4 text-white flex md:hidden">
//         <button
//           onClick={toggleSidebar}
//           style={{
//             position: "fixed",
//             top: "1rem",
//             left: "1rem",
//           }}
//         >
//           <FiMenu size={24} />
//         </button>
//         <br />
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isOpen && (
//         <div
//           id="overlay"
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
//           onClick={closeSidebar}
//         ></div>
//       )}

//       {/* Sidebar Container */}
//       <div
//         className={`h-screen bg-black-700 w-64 p-5 fixed md:relative  transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out md:translate-x-0 z-20`}
//       >
//         {/* Close Button (Mobile Only) */}
//         <div className="flex justify-end md:hidden">
//           <button onClick={toggleSidebar}>
//             <FiX size={24} className="text-white" />
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="flex flex-col gap-4 mt-4">
//           {/* Profile Section */}
//           <div className="flex items-center gap-4">
//             <img
//               src={tulsi}
//               alt="Profile"
//               className="h-24 w-24 rounded-full object-cover"
//             />
//             <p className="text-white">{user?.username}</p>
//           </div>

//           {/* Navigation Links */}
//           <NavLink
//             to="/"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname === "/" ? "bg-gray-800 p-2" : " "
//             }`}

//             // className={({ isActive }) => (isActive ? "bg-gray-800 p-2" : "")}
//           >
//             Home Page
//           </NavLink>
//           <NavLink
//             to="/followers"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname.includes("/followers") ? "bg-gray-800 p-2" : " "
//             }`}
//           >
//             Followers
//           </NavLink>
//           <NavLink
//             to="/following"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname.includes("/following") ? "bg-gray-800 p-2" : " "
//             }`}
//           >
//             Following
//           </NavLink>
//           <NavLink
//             to="/request"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname.includes("/request") ? "bg-gray-800 p-2" : " "
//             }`}
//           >
//             Follow Requests
//           </NavLink>
//           <NavLink
//             to="sent"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname.includes("/sent") ? "bg-gray-800 p-2" : " "
//             }`}
//           >
//             Your Requested
//           </NavLink>
//           <NavLink
//             to="/allUsers"
//             className={`text-white hover:bg-gray-800 p-2 rounded ${
//               location.pathname.includes("/allUsers") ? "bg-gray-800 p-2" : " "
//             }`}
//           >
//             all Users
//           </NavLink>
//           <button
//             className="text-white bg-gray-800 hover:bg-gray-900 p-2 rounded "
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Sidebar;
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import tulsi from "../../../public/tulsi.jpg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    await axios.get("http://localhost:4000/user/logout", {
      withCredentials: true,
    });
    localStorage.setItem("isAuth", false);
    localStorage.setItem("user", null);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button (Niche Shift Kar Diya Hai) */}

      <div className="fixed top-0 md:hidden z-50 bg-gray-800 w-full h-14 flex items-center px-4">
        <button onClick={toggleSidebar} className="p-3 text-white rounded-full">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
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
            src={tulsi}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="text-white">{user?.username}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-3">
          <NavLink
            to="/"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname === "/" ? "bg-gray-800" : ""
            }`}
          >
            Home Page
          </NavLink>
          <NavLink
            to="/followers"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/followers") ? "bg-gray-800" : ""
            }`}
          >
            Followers
          </NavLink>
          <NavLink
            to="/following"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/following") ? "bg-gray-800" : ""
            }`}
          >
            Following
          </NavLink>
          <NavLink
            to="/request"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/request") ? "bg-gray-800" : ""
            }`}
          >
            Follow Requests
          </NavLink>
          <NavLink
            to="/sent"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/sent") ? "bg-gray-800" : ""
            }`}
          >
            Your Requested
          </NavLink>
          <NavLink
            to="/allUsers"
            className={`text-white hover:bg-gray-800 p-2 rounded ${
              location.pathname.includes("/allUsers") ? "bg-gray-800" : ""
            }`}
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
