import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home/Home.jsx";
import Following from "./components/Home/Following.jsx";
import Followers from "./components/Home/Followers.jsx";
import Request from "./components/Home/Request.jsx";
import Sent from "./components/Home/Sent.jsx";
import Login from "./components/Auth/Login.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import AllUsers from "./components/Home/AllUsers.jsx";
import Chat from "./components/Home/Chat.jsx";
import Sidebar from "./components/Home/Sidebar.jsx";
import { Provider } from "react-redux";
import store from "../Store/index.js";
import { SocketProvider } from "./context/socketContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "chat/:id",
        element: <Chat></Chat>,
      },
      {
        path: "following",
        element: <Following></Following>,
      },
      {
        path: "following/chat/:id",
        element: <Chat></Chat>,
      },
      {
        path: "followers",
        element: <Followers></Followers>,
      },
      {
        path: "followers/chat/:id",
        element: <Chat></Chat>,
      },

      {
        path: "request",
        element: <Request></Request>,
      },

      {
        path: "sent",
        element: <Sent></Sent>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <SignUp></SignUp>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "allUsers/chat/:id",
        element: <Chat></Chat>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </SocketProvider>
    </Provider>
  </StrictMode>
);
