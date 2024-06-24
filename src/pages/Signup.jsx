import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo2.png";
import Icon from 'react-icons-kit';
import { arrows_circle_check } from 'react-icons-kit/linea/arrows_circle_check';
import { arrows_exclamation } from 'react-icons-kit/linea/arrows_exclamation';
import { useAuth } from "../authContext.js";

function Signup() {
  const { isAuthenticated, signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    accountType: "",
    password: "",
    confirmPassword: "",
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  function PasswordChecker(event) {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');
    const value = event.target.value;

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));

    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: value,
    }));
  }

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log("ENV FILE", process.env.REACT_APP_BASE_URL);

    if (lowerValidated && upperValidated && numberValidated && specialValidated && lengthValidated) {
      const apiUrl = formData.accountType === "User"
        ? `${process.env.REACT_APP_BASE_URL}/studentSignup`
        : `${process.env.REACT_APP_BASE_URL}/canteenSignup`;

      try {
        setLoading(true);

        const response = await axios.post(apiUrl, formData);

        toast.success("Account Created Successfully!");
        if (formData.accountType === "User") {
          navigate("/");
        }
        if (formData.accountType === "Canteen") {
          const token = response.data.token;
          signUp(token);
          navigate("/home");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to create account. Please try again.";
        toast.error(errorMessage);
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password must pass all the criteria");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:flex w-full md:w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
        <div>
          <img src={logo} alt="logo" className="w-48 h-12 mb-2" />
          <p className="text-white mt-1 ml-3">Connecting You to Your College Canteens</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 py-10 bg-white">
        <form
          className="bg-white p-8 rounded shadow-lg w-full max-w-md overflow-y-auto"
          onSubmit={submitHandler}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center md:text-left">
            Hello There!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7 text-center md:text-left">
            Create an Account
          </p>

          <div className="mb-4">
            <input
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
          </div>

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
            <input
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
              type="text"
              placeholder="College Name"
              name="collegeName"
              value={formData.collegeName}
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
              onChange={PasswordChecker}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}

            </span>
          </div>

          <div className="relative mb-4">
            <input
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>

          <div className="mb-4">
            <div className={`flex items-center ${lowerValidated ? "text-green-600" : "text-red-500"}`}>
              <span className="mr-2">{lowerValidated ? <Icon icon={arrows_circle_check} /> : <Icon icon={arrows_exclamation} />}</span>
              <p className="text-xs">At least one lowercase letter</p>
            </div>
            <div className={`flex items-center ${upperValidated ? "text-green-600" : "text-red-500"}`}>
              <span className="mr-2">{upperValidated ? <Icon icon={arrows_circle_check} /> : <Icon icon={arrows_exclamation} />}</span>
              <p className="text-xs">At least one uppercase letter</p>
            </div>
            <div className={`flex items-center ${numberValidated ? "text-green-600" : "text-red-500"}`}>
              <span className="mr-2">{numberValidated ? <Icon icon={arrows_circle_check} /> : <Icon icon={arrows_exclamation} />}</span>
              <p className="text-xs">At least one number</p>
            </div>
            <div className={`flex items-center ${specialValidated ? "text-green-600" : "text-red-500"}`}>
              <span className="mr-2">{specialValidated ? <Icon icon={arrows_circle_check} /> : <Icon icon={arrows_exclamation} />}</span>
              <p className="text-xs">At least one special character</p>
            </div>
            <div className={`flex items-center ${lengthValidated ? "text-green-600" : "text-red-500"}`}>
              <span className="mr-2">{lengthValidated ? <Icon icon={arrows_circle_check} /> : <Icon icon={arrows_exclamation} />}</span>
              <p className="text-xs">Minimum 8 characters</p>
            </div>
          </div>
          <div className="flex justify-center">
          <button
            className={`w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-600 text-sm font-semibold hover:underline">
              Already have an account? Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
