import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=" p-3 h-screen overflow-hidden lg:p-10">
      <div className="flex items-center justify-between">
        <img className="w-[150px]" src="/logo/logo1.png" alt="" />
        <div className="flex items-center gap-8">
          <Link to="/contact" className="text-[20px]">
            Contact
          </Link>
          <Link to="/login" className="text-[20px]">
            Login
          </Link>
        </div>
      </div>
      <div className=" w-full mt-5 h-[83vh]">
        <img
          className="w-full h-full object-top object-cover"
          src="/assets/login.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
