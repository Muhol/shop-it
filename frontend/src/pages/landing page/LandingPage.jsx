import React from "react";
import "./LandingPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { SlSocialInstagram } from "react-icons/sl";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="landingpage">
      <div className="left">
        <img src="/landing page logo.png" alt="" />
      </div>
      <div className="right">
        <div className="topheader">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/shop">
            <p>Shop</p>
          </Link>
          <Link to="#">
            <p>About Us</p>
          </Link>
          <Link to="#">
            <p>Contact Us</p>
          </Link>
        </div>
        <div className="body">
          <div className="bodyWrapper">
            <p className="catchPhrase">
              Your One-Stop Shop for Everything You Love.
            </p>
            <p className="slogan">Shop Smart, Live Better!</p>

            <div className="welcomenote">

            <p className="welcome">Welcome,</p>
            <p>We are the masters of our craft. Our commitment to quality products, exeptional services and incomparable customer care to keep our community comming back again and again.</p>
            </div>

            <Link to={"shop"} className="button"><p>Shop Now</p></Link>
            <div className="icons">
              <SlSocialInstagram className="icon" />
              <BiLogoFacebookCircle className="icon"/>
              <FaTwitter className="icon"/>
              <FaSquareWhatsapp className="icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
