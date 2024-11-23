import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { users } from "../assets/users";
import { toast } from "react-toastify";
import { MyContext } from "../mangement/Mycontext";
const taostSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",

};
const Login = () => {
  const {setAuthenticateUser} = useContext(MyContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignin = (e) => {
    e.preventDefault()
    const finduser = users.filter((item) => item.email === email);
    if (finduser.length > 0) {
      if (finduser[0].password === password) {
        setAuthenticateUser(finduser[0])
        toast.success("Login Successfull.", taostSettings);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error("Incorrect Password", taostSettings);
      }
    } else {
      toast.error("No user found", taostSettings);
    }
  };

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
          <form onSubmit={handleSignin} className="w-full flex flex-col gap-3">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email."
              className="w-full py-2 px-3 outline-none border lg:w-[400px]"
            />
            <input
              type="text"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full py-2 px-3 outline-none border lg:w-[400px]"
            />
            <button
              type="submit"
              className="text-white py-3 font-semibold w-full rounded-sm bg-black"
            >
              Sign in
            </button>
            <div className=" w-full my-2 flex items-center justify-center  h-[1px] bg-black">
              <p className="bg-[#8C9DAD] px-1">or</p>
            </div>
            <button
              type="button"
              className=" bg-[#4285F4] rounded-md p-[2px] flex items-center gap-2"
            >
              <div className="bg-white px-2 rounded-md py-2">
                <img
                  className="w-7 h-7 rounded-full"
                  src="/logo/google.png"
                  alt=""
                />
              </div>
              <p className="text-lg -ml-5 text-white text-center w-full">
                Sign in with google
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
