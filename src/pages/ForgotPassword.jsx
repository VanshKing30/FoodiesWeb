import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/logo2.png";
import Loader from "../components/Loader/Loader";


function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    setLoading(true);

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/VerifyUser`;
    // const apiUrl = `http://localhost:4000/api/v1/VerifyUser `;

    axios
      .post(apiUrl, formData)
      .then((response) => {
        setLoading(false);
        toast.success("Link sent to your email");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to send Link");
      });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                Recover Password
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-3">
                Please enter your email
              </p>

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
              <button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2">
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
