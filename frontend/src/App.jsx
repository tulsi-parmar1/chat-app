import { Toaster } from "react-hot-toast";
import "./index.css";
import Sidebar from "./components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    // if (!isAuth) {
    //   navigate("/login");
    // }
  });
  return (
    <>
      {/* <SignUp></SignUp> */}

      <div className={`flex h-screen `}>
        {/* Sidebar with fixed width */}
        <div className={`${!isAuth && "hidden"}`}>
          <Sidebar />
        </div>
        {/* Main content area */}
        <div className="flex-1 p-5 bg-black overflow-auto md:pt-7 pt-18">
          <Outlet />
        </div>
      </div>

      {/* <Login></Login> */}
      <Toaster />
    </>
  );
}

export default App;
