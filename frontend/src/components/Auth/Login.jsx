import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { conversationActions } from "../../../Slice/ConversationSlice";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (FormData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/login",
        FormData,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      localStorage.setItem("isAuth", true);
      const data2 = await axios.get(
        "http://localhost:4000/user/getUser",

        {
          withCredentials: true,
        }
      );
      dispatch(conversationActions.setUser(data2.data));
      localStorage.setItem("user", JSON.stringify(data2.data));

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", false);

      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center ">
      <form
        action=""
        className="border border-white px-6 py-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
          <br />

          {/* -----------username----------- */}
          <div>
            <fieldset className="fieldset">
              <input
                type="text"
                className="input"
                placeholder="username"
                {...register("username", { required: true })}
              />
            </fieldset>
          </div>
          <br />
          {/* ---------password--------- */}
          <label className="input validator">
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
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              type="password"
              required
              placeholder="Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("password", { required: true })}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
        </div>

        <br />

        <button className="text-white-600 bg-blue-700 cursor-pointer p-1 w-full rounded-lg">
          login
        </button>

        <br />
        <div className="flex  justify-between">
          <p>Register new Account</p>
          <a
            onClick={() => navigate("/register")}
            className="underline text-blue-500 cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
