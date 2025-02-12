import React, { useContext } from "react";
import "./cart.scss";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { MdDelete, MdSummarize } from "react-icons/md";
import Context from "../../context";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

function Cart() {
  const context = useContext(Context);
  const user = context.user;
  const navigate = useNavigate();

  const { fetchCart } = useContext(Context);

  const cart = context?.cart;
  const products = context?.cart?.items;

  //DELETE FUNCTIONALITY
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const fetchApi = await fetch(summaryApi.deleteCartItem.url, {
        method: summaryApi.deleteCartItem.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          itemId: id,
        }),
      });
      const response = await fetchApi.json();

      if (response.success) {
        fetchCart();
      }

      if (response.error) {
        window.alert(`${response.message}`);
      }
    } catch (error) {
    }
  };
  //DELETE FUNCTIONALITY

  // CHANGING QUANTITY
  const increaseQty = async (e, id) => {
    e.preventDefault();
    const payload = {
      itemId: id,
      funcType: "increase",
    };
    try {
      const fetchApi = await fetch(summaryApi.updCartItemQuantity.url, {
        method: summaryApi.updCartItemQuantity.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await fetchApi.json();

      if (response.success) {
        fetchCart();
      }
      if (response.error) {
        window.alert(`${response.message}`);
      }
    } catch (error) {
    }
  };
  const decreaseQty = async (e, id) => {
    e.preventDefault();
    const payload = {
      itemId: id,
      funcType: "decrease",
    };
    try {
      const fetchApi = await fetch(summaryApi.updCartItemQuantity.url, {
        method: summaryApi.updCartItemQuantity.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await fetchApi.json();

      if (response.success) {
      }
      if (response.error) {
        window.alert(`${response.message}`);
      }
    } catch (error) {
    }
  };
  // CHANGING QUANTITY



  //CHECKOUT FUNCTIONALITY
  const handleCheckOut = async (e) => {
    e.preventDefault();
    try {
      const fetchCheckout = await fetch(summaryApi.checkout.url, {
        method: summaryApi.checkout.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(products),
      });
      const response = await fetchCheckout.json();
      if (response) {
        try {
          window.location.href = response.url;
        } catch (error) {
        window.alert(`${error.message}`);
        } finally {
          clearCart()
        }
      }
    } catch (error) {
        window.alert(`${error.message}`);
    }
  };
  //CHECKOUT FUNCTIONALITY

  return (
    <div className="cartcontainer">
      <div className="cartwrapper">
        <div className="left">
          <p className="heading">My Cart </p>
          <div className="leftcont">
            {products?.map((product) => {
              return (
                <div className="cartProductCard" key={product?.productId._id}>
                  <div className="imgcontainer">
                    <img src={product?.productId.productImage[0]} alt="" />
                  </div>
                  <div className="details">
                    <p className="productname">
                      {product?.productId.productName}
                    </p>
                    <p className="price">
                      KES <span>{product?.price}</span>
                    </p>
                    <div className="quantitysection">
                      <button onClick={(e) => decreaseQty(e, product?._id)}>
                        <RiSubtractLine />
                      </button>
                      <p className="quantity">{product?.quantity}</p>
                      <button onClick={(e) => increaseQty(e, product?._id)}>
                        <IoMdAdd />
                      </button>
                    </div>
                    <div
                      className="delete"
                      onClick={(e) => handleDelete(e, product?._id)}
                    >
                      <RiDeleteBin5Line />
                    </div>
                  </div>
                  <div className="subtotal">
                    <p>  KES <span>{product?.price * product?.quantity}</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="summary">
            <div className="top">
              <p className="heading">Order Summary</p>
            </div>
            <div className="middle">
              <div className="total">
                <p>Total Price</p>
                <span>KES {cart?.totalPrice || 0}</span>
              </div>
            </div>
            <div className="bottom">
              <button onClick={(e) => handleCheckOut(e)}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
