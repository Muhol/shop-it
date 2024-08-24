import React, { useContext, useEffect } from "react";
import Context from "../../context";
import summaryApi from "../../../common";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./success.scss";

function Success() {
  const { fetchCart } = useContext(Context);

  //DELETE CART
  const clearCart = async () => {
    try {
      const fetchApi = await fetch(summaryApi.deleteCart.url, {
        method: summaryApi.deleteCart.method,
        credentials: "include",
      });

      const response = await fetchApi.json();

      if (response.success) {
      }
      if (response.error) {
        window.alert(re);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //DELETE CART

  useEffect(() => {
    clearCart();
    fetchCart();
  }, []);
  return (
    <div className="checkout">
      <div className="mastercont">
        <div className="container">
          <h1>Checkout Successfull</h1>
        </div>
        <Link to={"/orders"} >
        <button>See Order</button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
