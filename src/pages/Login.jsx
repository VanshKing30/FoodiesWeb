import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo2.png";
import Loader from "../components/Loader/Loader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    accountType: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const apiUrl =
        formData.accountType === "User"
          ? `http://localhost:8000/api/v1/studentLogin`
          : `http://localhost:8000/api/v1/canteenLogin`;

      const response = await axios.post(apiUrl, formData);

      // Assuming the response contains a token
      const token = response.data.token;
      
      localStorage.setItem("token", token);
      localStorage.setItem('canteenId', response.data.cantId);
      if (formData.accountType === "User") {
        toast.success("User logged in successfully!");
        navigate("/home");
      } else {
        toast.success("Canteen logged in successfully!");
        navigate(`/section/${response.data.cantId}`);
      }
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative h-screen md:flex">
          <div className="absolute top-0 right-0 m-3">
            <Link to="/contact">
              <button
                className="hover:shadow-blue-950 hover:shadow-sm text-white py-1 px-2 w-full h-auto text-l relative z-0 rounded-full transition-all duration-200 hover:scale-110"
              >
                <img src="/c4.png" className="h-10 w-10" />
              </button>
            </Link>
          </div>
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
            <div>
              <img src={logo} alt="logo" className="w-48 h-12 mb-2" />
              <p className="text-white mt-1 ml-3">
                Connecting You to Your College Canteens
              </p>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form
              className="bg-white p-8 rounded shadow-lg w-80"
              onSubmit={submitHandler}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

              <div className="mb-4">
                <input
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="mb-4">
                <select
                  required
                  name="accountType"
                  onChange={changeHandler}
                  value={formData.accountType}
                  className="mt-1 p-2 w-full border rounded-2xl"
                >
                  <option value="" disabled hidden>
                    Login as
                  </option>
                  <option value="User">User</option>
                  <option value="Canteen">Canteen</option>
                </select>
              </div>

              <div className="relative mb-4">
                <input
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>

              <Link to="/signup">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                  Don't have an account? Sign Up
                </span>
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
