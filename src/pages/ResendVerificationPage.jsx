import axios from 'axios';
import { useState } from 'react';
import logo from "../assets/logo2.png"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ResendVerificationPage = () => {


    const [formData, setFormData] = useState({
        email: "",
        accountType : "",
      });
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
    
      function changeHandler(event) {
        setFormData((prevData) => ({
          ...prevData,
          [event.target.name]: event.target.value,
        }));
      }
    
    
      function submitHandler(event) {
        
        
        event.preventDefault();
        
          const apiUrl = `${process.env.REACT_APP_BASE_URL}/resendVerificationEmail`;
    
          axios.post(apiUrl , formData)
          .then((response)=>{
            toast.success(response.data.message);
            navigate("/");
          })
          .catch((error)=>{
            toast.error(error.response.data.message)
          });
        
      }
    
      return (
        <div className="h-screen md:flex">
    
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
    
            <div>
              <img src={logo} alt="logo" className="w-48 h-12 mb-2"/>
              <p className="text-white mt-1 ml-3">Connecting You to Your College Canteens</p>
            </div>
    
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    
          </div>
    
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
    
            <form className="bg-white p-8 rounded shadow-lg w-80" onSubmit={submitHandler}>
    
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Resend Verification Email</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">Enter your email</p>
    
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
                    <option value="" disabled selected hidden>User Type</option>
                    <option value="User">User</option>
                    <option value="Canteen">Canteen</option>
                  </select>
              </div>
            
    
              <button type="submit" className="w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2">
                Send
              </button>
    
              <Link to="/signup">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Not registered? Create an account</span>
              </Link>
              <br/>
              <Link to="/">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already registered? Login</span>
              </Link>
              
            </form>
    
          </div>
    
        </div>

    )
}

export default ResendVerificationPage
