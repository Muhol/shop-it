import React, { useState } from "react";
import "./signup.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../../helpers/imageToBase64";
import summaryApi from "../../../common";
import { toast } from 'react-toastify';


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [ role, setRole ] = useState("GENERAL")


  const data = {
    username: username,
    email: email,
    password: password,
    profilePic: profilePic,
    role: role,
  } 

  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault(); 

    if(password === confirmPassword){
      const resData = await fetch(summaryApi.signUp.url,{
        method: summaryApi.signUp.method,
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
      })
       
      const dataApi = await resData.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/shop")
      }
      
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }else{
      toast.error("Check if password is the same as confirm password....")
    }
    
  };                



  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageToBase64(file)
    setProfilePic(imagePic)
  }
  return (
    <section className="main">
      <div className="signupcontainer">
        <h1>Sign In</h1>
        <div className="signuplogo">
          <div className="image">
            <img src={ profilePic || "/Gray and Black Simple Studio Logo.jpg"} alt="" />
            <div className="imageupload">
              <form>
                <label For="profilpic">
                  <p>Upload Image</p>
                </label>
                <input type="file" id="profilpic" onChange={handleUploadPic}/>
              </form>
            </div>
          </div>
        </div>

        <form onSubmit={handleSumbit}>
          <div className="info">
            <label>Username</label>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your Username....."
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="info">
            <label>Email</label>
            <div className="input">
              <input
                type="email"
                placeholder="Enter your email....."
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="info">
            <label>Password</label>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password....."
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="showicon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="info">
            <label>Confirm Password</label>
            <div className="input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password....."
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="showicon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button type="submit" onSubmit={handleSumbit}>
            Sign Up
          </button>
        </form>
        <div className="login">
          <p>
            Already have an Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
