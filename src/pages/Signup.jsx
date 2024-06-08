import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo2.png";
import Icon from "react-icons-kit";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import Loader from "../components/Loader/Loader";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    accountType: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  function PasswordChecker(event) {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp(
      "(?=.*[!@#$%^&*])"
    );
    const length = new RegExp("(?=.{8,})");
    const value = event.target.value;
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
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
    console.log(
      "ENV FILE",
      process.env.REACT_APP_BASE_URL
    );

    if (
      lowerValidated &&
      upperValidated &&
      numberValidated &&
      specialValidated &&
      lengthValidated
    ) {
      if (formData.accountType === "User") {
         // const apiUrl = `${process.env.REACT_APP_BASE_URL}/studentSignup`;
          const apiUrl = `http://localhost:3000/api/v1/studentSignup`;
         try {
          setLoading(true);
        
          const response = await axios.post(apiUrl, formData);
        
          toast.success("Account Created Successfully!"); 
          navigate("/home");
        } catch (error) {
          toast.error("Failed To Create Account. Please try again."); 
          console.error(error); 
        } finally {
          setLoading(false);
        }
      } else {
        const apiUrl = `http://localhost:8000/api/v1/canteenSignup`
       // const apiUrl = `${process.env.REACT_APP_BASE_URL}/canteenSignup`;
        try {
          setLoading(true);
        
          const response = await axios.post(apiUrl, formData);
        
          toast.success("Account Created Successfully!"); 
          navigate("/home");
        } catch (error) {
          toast.error("Failed To Create Account. Please try again."); 
          console.error(error); 
        } finally {
          setLoading(false);
        }

      }
    } else {
      toast.error(
        "Password must pass all the criteria"
      );
    }
  }

  return (
    <>
      {
        loading ? (
        <Loader/>
        ) : (
            <>
              <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-48 h-12 mb-2"
          />
          <p className="text-white mt-1 ml-3">
            Connecting You to Your College
            Canteens
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
          onSubmit={submitHandler}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello There!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
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
              className="mt-1 p-2 w-full border rounded-2xl">
              <option
                value=""
                disabled
                selected
                hidden>
                Login as
              </option>
              <option value="User">User</option>
              <option value="Canteen">
                Canteen
              </option>
            </select>
          </div>

          <div className="relative mb-4">
            <input
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={PasswordChecker}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }>
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled = {loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}

          </button>

          <Link to="/login">
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Already have an account? Login
            </span>
          </Link>

          {/* 
            
            Validation Checks for password
            
          */}

          <main className="tracker-box text-sm font-normal text-red-600">
            <div
              className={
                lowerValidated
                  ? "validated text-green-600"
                  : "not-validated"
              }>
              {lowerValidated ? (
                <span className="list-icon green">
                  <Icon
                    icon={arrows_circle_check}
                  />
                </span>
              ) : (
                <span className="list-icon">
                  <Icon
                    icon={arrows_exclamation}
                  />
                </span>
              )}
              At least one lowercase letter
            </div>
            <div
              className={
                upperValidated
                  ? "validated text-green-600"
                  : "not-validated"
              }>
              {upperValidated ? (
                <span className="list-icon green">
                  <Icon
                    icon={arrows_circle_check}
                  />
                </span>
              ) : (
                <span className="list-icon">
                  <Icon
                    icon={arrows_exclamation}
                  />
                </span>
              )}
              At least one uppercase letter
            </div>
            <div
              className={
                numberValidated
                  ? "validated text-green-600"
                  : "not-validated"
              }>
              {numberValidated ? (
                <span className="list-icon green">
                  <Icon
                    icon={arrows_circle_check}
                  />
                </span>
              ) : (
                <span className="list-icon">
                  <Icon
                    icon={arrows_exclamation}
                  />
                </span>
              )}
              At least one number
            </div>
            <div
              className={
                specialValidated
                  ? "validated text-green-600"
                  : "not-validated"
              }>
              {specialValidated ? (
                <span className="list-icon green">
                  <Icon
                    icon={arrows_circle_check}
                  />
                </span>
              ) : (
                <span className="list-icon">
                  <Icon
                    icon={arrows_exclamation}
                  />
                </span>
              )}
              At least one special character
            </div>
            <div
              className={
                lengthValidated
                  ? "validated text-green-600"
                  : "not-validated"
              }>
              {lengthValidated ? (
                <span className="list-icon green">
                  <Icon
                    icon={arrows_circle_check}
                  />
                </span>
              ) : (
                <span className="list-icon">
                  <Icon
                    icon={arrows_exclamation}
                  />
                </span>
              )}
              At least 8 characters
            </div>
          </main>
        </form>
      </div>
      <style jsx global>
        {`
          .tracker-box {
            font-size: 0.7rem;
            letter-spacing: 0.09em;
            padding: 15px;
            border-radius: 5px;
            margin-top: 5px;
          }

          .tracker-box div {
            margin: 5px 0;
          }

          .list-icon {
            padding-right: 0.3rem;
          }

          .list-icon.green {
            color: #006400;
          }
        `}
      </style>
    </div>
  );
            </>
        )
      }
    </>
  )
}

export default Signup;
