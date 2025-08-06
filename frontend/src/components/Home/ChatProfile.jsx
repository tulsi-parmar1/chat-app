import React from "react";
import tulsi from "../../../public/tulsi.jpg";
import { IoMdArrowRoundBack } from "react-icons/io";

function ChatProfile({ receiver }) {
  return (
    <div>
      <div className="bg-teal-900 px-4 py-3 flex items-center shadow-md rounded-lg mb-7 ">
        <p style={{ fontSize: "30px" }}>
          {" "}
          <IoMdArrowRoundBack onClick={() => window.history.back()} />
        </p>
        <img
          src={tulsi}
          alt="User Avatar"
          className="h-14 w-14 object-cover rounded-full border-2 border-blue-500"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-200">
            {receiver?.username}
          </h2>
          <p className="text-sm text-gray-900">{receiver?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatProfile;
