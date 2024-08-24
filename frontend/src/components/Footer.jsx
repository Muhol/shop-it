import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { SlSocialInstagram } from "react-icons/sl";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer">
      <div className="footerWrapper">
        <div className="top">
          <h2>shopIt</h2>
        </div>
        <div className="middle">
          {/* <div className="left"> */}
          {/* </div> */}
          <div className="section">
            <div className="head">
              <p>Customer Service</p>
            </div>
            <li>
              Contact Us: <Link to={"#"}>support@shopIt.com</Link> |
              +254-735-397-599
            </li>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </div>
          <div className="section" id="mid" >
            <div className="head">
              <p>Company </p>
            </div>
            <li>About Us </li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Sustainability</li>
          </div>
          <div className="section">
            <div className="head">
              <p>Legal </p>
            </div>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
            <li>Cookie Policy</li>
          </div>
        </div>
        <div className="bottom">
          <div className="socials">
            <div className="head">
              <p>Connect With Us</p>
            </div>
            <div className="icon">
              <SlSocialInstagram />
              <BiLogoFacebookCircle />
              <FaTwitter />
              <FaSquareWhatsapp />
            </div>
            <p>
              Subscribe to Our Newsletter to get the latest updates on new
              products and upcoming sales.
            </p>
          </div>
          <div className="payment">
            <div className="head">
              <p>Secure Payments</p>
            </div>
            <li>Visa | Mastercard | PayPal | American Express | Apple pay </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
