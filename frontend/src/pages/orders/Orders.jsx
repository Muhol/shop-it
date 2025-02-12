import React, { useEffect, useState } from "react";
import "./orders.scss";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";
import moment from "moment";

const Orders = () => {
  const [data, setData] = useState([]);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  console.log(data[0]?.items)

  //fetch user orders
  const fetchOrders = async () => {
    const fetchApi = await fetch(summaryApi.getSingleUserOrders.url, {
      method: summaryApi.getSingleUserOrders.method,
      credentials: "include",
    });

    const response = await fetchApi.json();

    if (response.success) {
      setData(response.data);
    }
    if (response.error) {
      window.alert(`${response.message}`);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="ordermaincont">
      <div className="bottom">
        <Link to={"/shop"}>Continue Browsing</Link>
      </div>

      {sortedData?.map((order) => {
        return (
          <div className="orders" key={order._id}>
            <div className="top">
              <p>
                <b>Order Id:</b> {order._id}{" "}
              </p>
              <p>
                <b>Date:</b> {moment(order.createdAt).format("LL")}{" "}
              </p>
            </div>

            <div className="ordersummarycont">
              {order?.items?.map((item) => {
                return (
                  <div className="orderItem" key={item._id}>
                    {/* <img src={item?.productId?.productImage[0]} alt="" /> */}
                    <div className="itemdetails">
                      <div className="top">
                        <p className="productname"> {item.name}</p>
                      </div>
                      <div className="bottom">
                        <p className="unitamount">Ksh {item.price}</p>
                        <p className="quantity">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="summary">
                <div className="sumcont">
                  <div className="top">
                    <div className="lines">
                      <p>Subtotal</p>
                      <p>Ksh {order.totalAmount}</p>
                    </div>
                    <div className="lines">
                      <p>Delivery</p>
                      <p>Free</p>
                    </div>
                  </div>

                  <div className="bottom">
                    <div className="total">
                      <p>Total</p>
                      <p>Ksh{order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="addresses">
              <div className="sides">
                <p className="heading"> Delivery address</p>
                <p>{order.name}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.line1},{" "}
                  {order.shippingAddress.line2}{" "}
                  {order.shippingAddress.postal_code}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>3-5 Business Days</p>
              </div>
              <div className="sides">
                <p className="heading"> Billing address</p>
                <p>{order.name}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.line1},{" "}
                  {order.shippingAddress.line2}{" "}
                  {order.shippingAddress.postal_code}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
