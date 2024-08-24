import React, { useEffect, useState } from "react";
import "./Slider.scss";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

function Slider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (currentImage === 2) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(2);
    } else {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 20000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="section Slider">
      {/* <div className="arrows"> */}
        <div className="btns left" onClick={previousImage}>
          <FaChevronLeft />
        </div>
        <div className="btns right" onClick={nextImage}>
          <FaChevronRight />
        </div>
      {/* </div> */}

      {currentImage === 0 && <img src="/banners/laptops (1).png" alt="" />}
      {currentImage === 1 && <img src="/banners/laptops (2).png" alt="" />}
      {currentImage === 2 && <img src="/banners/laptops (3).png" alt="" />}
      {/* <button>next</button> */}
    </div>
  );
}

export default Slider;
