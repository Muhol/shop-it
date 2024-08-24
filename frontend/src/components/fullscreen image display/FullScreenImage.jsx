import React from "react";
import "./fullScreenImage.scss";
import { IoMdClose } from "react-icons/io";

function FullScreenImage({ imageUrl, onClose }) {
  return (
    <div className="fullScreenImage">
      <div className="fullimage">
        <div className="close" onClick={onClose}>
          <IoMdClose />
        </div>
        <img src={imageUrl} alt="" className="image"/>
      </div>
    </div>
  );
} 

export default FullScreenImage;
