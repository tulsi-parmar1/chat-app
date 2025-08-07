import { Toaster } from "react-hot-toast";
import "./index.css";
import Sidebar from "./components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { conversationActions } from "../Slice/ConversationSlice";
import { socketContext } from "./context/SocketContext";

function App() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const navigate = useNavigate();
  const { socket } = useContext(socketContext);
  console.log("socket in app", socket);
  const dispatch = useDispatch();
  useEffect(() => {
    const getdata = async (req, res) => {
      try {
        const data2 = await axios.get(
          `https://chat-app-ob0w.onrender.com/user/getUser`,
          { withCredentials: true },
          {
            withCredentials: true,
          }
        );
        dispatch(conversationActions.setUser(data2.data));
        localStorage.setItem("user", JSON.stringify(data2.data));
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);
  // useEffect(() => {

  // }, []);
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
