import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/logo2.png";
import Loader from "../components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";

function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || { email: "" };
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  function changeHandler(event) {
    setOtp(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!otp) {
        alert("Enter the OTP first");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/otp/verifyotp",
        { email: userData.email, otp }
      );
      setLoading(false);
      if (response.data.success) {
        toast.success("OTP Verified Successfully");
        const link = response.data.link;
        console.log("Link is:-> ", link);
        navigate(`${link}`); // Redirect to home or another page after successful verification
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to verify OTP");
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen md:flex">
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
              onSubmit={submitHandler}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Verify OTP
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-3">
                Please enter the OTP sent to your email
              </p>

              <div className="mb-4">
                <input
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
                  type="text"
                  placeholder="OTP"
                  value={otp}
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

export default OtpVerify;
