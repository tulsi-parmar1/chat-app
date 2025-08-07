import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { conversationActions } from "../../../Slice/ConversationSlice.js";
function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data2) => {
    // e.preventDefault();
    try {
      console.log(data2);
      if (password !== confirmPassword) {
        return toast.error("password must be same");
      }
      const { data } = await axios.post(
        "https://chat-app-ob0w.onrender.com/user/signUp",
        data2,
        { withCredentials: true }
      );
      const response = await axios.get(
        "https://chat-app-ob0w.onrender.com/user/getUser",
        {
          withCredentials: true,
        }
      );
      dispatch(conversationActions.setUser(data2.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuth", true);
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-3 rounded-md"
      >
        <div>
          <h1 className="text-3xl font-bold">Create a new Account</h1>
          <br />
          {/* ----------------name---------------- */}
          <fieldset className="fieldset">
            <input
              type="text"
              className="input"
              placeholder="enter your name"
              {...register("name", { required: true })}
            />
          </fieldset>
        </div>
        <br />
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
        <div>
          {errors.name && (
            <span className="text-red-400 ">This field is required</span>
          )}
          <br />
          {/* -----------email----------- */}

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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>

            <input
              type="email"
              placeholder="mail@site.com"
              required
              {...register("email", { required: true })}
            />
          </label>

          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <div>
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

        <div>
          <br />
          {/* ----confirm password------ */}
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
              placeholder="confirm password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              {...register("confirmPassword", { required: true })}
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
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
          Sign Up
        </button>

        <br />
        <div className="flex  justify-between">
          <p>Already have an account?</p>
          <a href="" className="underline text-blue-500 cursor-pointer">
            login
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
