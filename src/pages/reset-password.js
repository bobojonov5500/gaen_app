import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiCall from "../services/getArticles";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const HandleResetPassword = async (e) => {
    const post = {
      uidb64: uid,
      password,
      confirm_password: confirmPassword,
      token,
    };
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("do not match password");
      return;
    }
    try {
      await ApiCall.resetPassword(post);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mt-40 max-w-sm py-3 rounded px-5 mx-auto border border-white">
      <form action="" onSubmit={HandleResetPassword} className="flex-col">
        <div className="text-white">
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="password"
          >
            password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  "
            type="password"
            id="password"
          />
        </div>
        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="confirmpassword"
          >
            confirm password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className=" text-black border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400"
            type="password"
            id="confirmpassword"
          />
        </div>
        <button className="mt-2 px-3 py-1 bg-yellow-500 rounded-md active:text-red-600">
          reset password
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
