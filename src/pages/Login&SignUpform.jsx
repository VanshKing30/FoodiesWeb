import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo2.png";
import Icon from 'react-icons-kit';
import { arrows_circle_check } from 'react-icons-kit/linea/arrows_circle_check'
import { arrows_exclamation } from 'react-icons-kit/linea/arrows_exclamation'
import { toast } from "react-hot-toast";
import "./Login.css";
const Login = ({ data }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        collegeName: "",
        accountType: "",
        password: "",
      });
  const [checker, setChecker] = useState({
    signup: false,
  });

  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);


  const navigate = useNavigate();

  function PasswordChecker(event) {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    const value = event.target.value;
    if (lower.test(value)) {
      setLowerValidated(true);
    }
    else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    }
    else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    }
    else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    }
    else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    }
    else {
      setLengthValidated(false);
    }


    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    if (data) {
      setChecker({ signup: true });
    } else {
      setChecker({ signup: false });
    }
  }, [data]);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const handleSignup = () =>
   { setChecker({ signup: true });setFormData({ name: "", email: "",  collegeName: "",  accountType: "",  password: "",})};
  const handleSignIn = () =>
    {setChecker({ signup: false});setFormData({ name: "", email: "",  collegeName: "",  accountType: "",  password: "",})};

  // submit signup

  function submitHandler(event) {
    event.preventDefault();
    console.log("ENV FILE",process.env.REACT_APP_BASE_URL);

    if (lowerValidated && upperValidated && numberValidated && specialValidated && lengthValidated) {
      if (formData.accountType === "User") {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/studentSignup`;
        // const apiUrl = `http://localhost:4000/api/v1/studentSignup`;

        axios
          .post(apiUrl, formData)
          .then((response) => {
            toast.success("Account Created succesfully");
            navigate("/home");
          })
          .catch((error) => {
            toast.error("Failed To create account");
          });
      } else {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/canteenSignup`;


        axios
          .post(apiUrl, formData)
          .then((response) => {
            toast.success("Account Created succesfully");
            navigate(`/section/${response.data.cantId}`);
          })
          .catch((error) => {
            console.log("Errorrr:->",error);
            toast.error("Failed To create account");
          });
      }
    } else {
      toast.error("Password must pass all the criteria");
    }
  }

  // submit Login


  async function UserLoged(event) {
    event.preventDefault();



    if(formData.accountType === "User"){

      const apiUrl = `${process.env.REACT_APP_BASE_URL}/studentLogin`;

      axios.post(apiUrl , formData)
      .then((response)=>{
        toast.success("User Logged in ");
        navigate("/home");
      })
      .catch((error)=>{
        toast.error("Failed to login")
      });
    }

    else{

      const apiUrl = `${process.env.REACT_APP_BASE_URL}/canteenLogin`;

      axios.post(apiUrl , formData)
      .then((response)=>{
        toast.success("User Logged in ");
        navigate(`/section/${response.data.cantId}`);
      })
      .catch((error)=>{
        toast.error("Failed to login")
      });
    }
  }
  return (
    <section id="login_signUpForm" className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
      
      <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div
        className={checker.signup ? "container active" : "container"}
        id="container"
      >

        {/* signup form */}

        <div className="form-container sign-up">

          <form 
          onSubmit={submitHandler}
          >
            <h1>Create Account</h1>
            <input
              required
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="College Name"
              name="collegeName"
              value={formData.collegeName}
              onChange={changeHandler}
            />
             <div className="mb-4" style={{width:'100%'}}>
            <select
              required
              name="accountType"
              style={{background:" #ecf0f3",boxShadow: "inset 6px 6px 6px #cbced1, inset -6px -6px 6px white"}}
              onChange={changeHandler}
              value={formData.accountType}
              className="mt-1 p-2 w-full border rounded-2xl"
            >
              <option value="" disabled selected hidden>
                Login as
              </option>
              <option value="User">User</option>
              <option value="Canteen">Canteen</option>
            </select>
          </div>
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={PasswordChecker}
            />
            <p>
              Already have a Account?
              <span onClick={handleSignIn}> Sign In</span>
            </p>
            {/* 
            
            Validation Checks for password
            
          */}

<main className={`${formData.password.length>0?'tracker-active':'tracker-box'} text-sm font-normal text-red-600`}>
            <div className={lowerValidated ? 'validated text-green-600' : 'not-validated'}>
              {lowerValidated ? (
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check} />
                </span>
              ) : (
                <span className='list-icon'>
                  <Icon icon={arrows_exclamation} />
                </span>
              )}
              At least one lowercase letter
            </div>
            <div className={upperValidated ? 'validated text-green-600' : 'not-validated'}>
              {upperValidated ? (
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check} />
                </span>
              ) : (
                <span className='list-icon'>
                  <Icon icon={arrows_exclamation} />
                </span>
              )}
              At least one uppercase letter
            </div>
            <div className={numberValidated ? 'validated text-green-600' : 'not-validated'}>
              {numberValidated ? (
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check} />
                </span>
              ) : (
                <span className='list-icon'>
                  <Icon icon={arrows_exclamation} />
                </span>
              )}
              At least one number
            </div>
            <div className={specialValidated ? 'validated text-green-600' : 'not-validated'}>
              {specialValidated ? (
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check} />
                </span>
              ) : (
                <span className='list-icon'>
                  <Icon icon={arrows_exclamation} />
                </span>
              )}
              At least one special character
            </div>
            <div className={lengthValidated ? 'validated text-green-600' : 'not-validated'}>
              {lengthValidated ? (
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check} />
                </span>
              ) : (
                <span className='list-icon'>
                  <Icon icon={arrows_exclamation} />
                </span>
              )}
              At least 8 characters
            </div>
          </main>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={UserLoged}>
            
            <h1>Sign In</h1>
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
             <div className="mb-4" style={{width:'100%'}}>
            <select
              required
              name="accountType"
              style={{background:" #ecf0f3",boxShadow: "inset 6px 6px 6px #cbced1, inset -6px -6px 6px white"}}
              onChange={changeHandler}
              value={formData.accountType}
              className="mt-1 p-2 w-full border rounded-2xl"
            >
              <option value="" disabled selected hidden>
                Login as
              </option>
              <option value="User">User</option>
              <option value="Canteen">Canteen</option>
            </select>
          </div>
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            <p>
              Don't have a Account?<span onClick={handleSignup}> Sign Up</span>
            </p>
            <p id="error">{checker.error ? checker.error : ""}</p>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
            <div id="Applogo">
              <img src={logo} alt="logo" />
            </div>
            <p>Connecting You to Your College Canteens</p>
              <h1>Welcome Back!</h1>
              <p>
                Please sign in to access your account, then click the 'Sign In'
                button to proceed.
              </p>
              <button className="butt" id="login" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
            <div id="Applogo">
              <img src={logo} alt="logo" />
            </div>
            <p>Connecting You to Your College Canteens</p>
              <h1>Hello, Friend!</h1>
              <p>
                Ready to get started? Click 'Sign Up' to create your account and
                unlock all the features.
              </p>
              <button  className="butt" id="register" onClick={handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
