//You're getting an error on Chrome for this component because of your LastPass extension

"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function PasswordInput({ placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle to show and hide the password
  function showPasswordHandler() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        className="text-sm w-full rounded-lg bg-slate-100 outline-1 outline-slate-200 px-3 py-1.5 transition-all"
      /> 
      <button
        type="button"
        onClick={showPasswordHandler}
        className="absolute top-0 right-0.5 p-2 flex items-center text-slate-400  hover:text-slate-500 outline-slate-300 ease-out duration-150"
      >
        {!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </button>
    </div>
  );
}
