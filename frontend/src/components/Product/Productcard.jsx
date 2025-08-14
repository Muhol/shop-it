import React, { useContext } from "react";
import "./productcard.scss";
// import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import Context from "../../context";

function Productcard({ product }) {

  const { fetchCart } = useContext(Context)
  
//CART FUNCTIONALITY
  const handleAddToCart = async(e, id) => {
    e.preventDefault()
    console.log(id)
    const quantity = 1

    const payload = {
    productId: id,
    quantity: quantity
    }

    try {
      const fetchApi = await fetch(summaryApi.addToCart.url,{
        method: summaryApi.addToCart.method,
        credentials: "include",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(payload)
      })

      const response = await fetchApi.json()

      if (response.success) {
        toast.success(response.message)
        fetchCart()
      }
      if (response.error) {
        toast.error(response.message)
      }
      
    } catch (error) {
      console.log("error", error.message)
    }
  }
//CART FUNCTIONALITY


  return (
    <>
      <div className="productcard">
        <Link to={'/product/' + product?._id} >
        {/* <div className="offerbadge">
          <span>53%</span>
        </div> */}
        <img src={product?.productImage[0]} alt="" />
        <div className="productdetails"  title={product?.description}>
          <div className="top">
            <p className="productname">
              <b>{product?.productName}</b>
            </p>
            <p className="description">{product?.description}</p>
            <div className="price">
              <p>Ksh </p>
              <h3>{product?.price}</h3>
            </div>
          </div>
          <div className="bottom">
          </div>
        </div>
        </Link>
            <button onClick={(e) => handleAddToCart(e, product._id)}>Add To Cart</button>
      </div>
    </>
  );
}

export default Productcard;
