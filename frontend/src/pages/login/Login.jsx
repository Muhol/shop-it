import React, { useContext, useState } from "react";
import "./login.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import Context from "../../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const data = {
    email: email,
    password: password,
  };

  const { fetchUserDetails, fetchCart } = useContext(Context);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const dataResponce = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponce.json();

    if (dataApi.success) {
      toast.success(`${dataApi.message}`);
      navigate("/shop");
      fetchUserDetails();
      fetchCart()
    }
    if (dataApi.error) {
      window.alert(`${dataApi.message}`)

    }
  };

  return (
    <section className="main1">
      <div className="logincontainer">
        <h1>Sign In</h1>
        <div className="loginlogo">
          <div className="image">
            <img src="/Gray and Black Simple Studio Logo.jpg" alt="" />
            <form>
              <label htmlFor="profilpic">
                <div className="imageupload">
                  <p>Change profile</p>
                </div>
              </label>
              <input type="file" id="profilpic" />
            </form>
          </div>
        </div>

        <form onSubmit={handleSumbit}>
          <div className="info">
            <label>Email</label>
            <div className="input">
              <input
                type="email"
                placeholder="Enter your email..."
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
                placeholder="Enter your password..."
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
            <div className="passwordreset">
              <Link to="/password-reset">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>

          <button type="submit" onSubmit={handleSumbit}>
            Login
          </button>
        </form>
        <div className="signup">
          <p>
            Don't have an Account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
