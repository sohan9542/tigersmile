import React from "react";

const Login = () => {
  return (
    <div className=" h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <img
        className="w-full h-full object-cover object-center"
        src="/assets/login.jpg"
        alt=""
      />
      <div className="h-full bg-[#8C9DAD] flex items-center justify-center flex-col">
        <div>
          <img
            className="w-[200px] object-contain"
            src="/logo/logo1.png"
            alt=""
          />
          <form className="w-full flex flex-col gap-3">
            <input
              type="text"
              required
              placeholder="Enter your email."
              className="w-full py-2 px-3 outline-none border lg:w-[400px]"
            />
            <input
              type="text"
              required
              placeholder="Enter your password"
              className="w-full py-2 px-3 outline-none border lg:w-[400px]"
            />
            <button className="text-white py-3 font-semibold w-full rounded-sm bg-black">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
