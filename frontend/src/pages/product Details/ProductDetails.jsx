import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import Context from "../../context";
import GroupedProducts from "../../components/Grouped Products/GroupedProducts";

function ProductDetails() {
  const id = useParams();

  //   FETCH DETAILS
  const [data, setData] = useState(null);
  console.log(data)
 

  const fetchProductDetails = async () => {
    try {
      const fetchApi1 = await fetch(summaryApi.getDetailedProduct.url, {
        method: summaryApi.getDetailedProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(id),
      });

      const response1 = await fetchApi1.json();

      if (response1.success) {
        setData(response1.data);
        console.log(response1.data)

        if (data !== null) {
          // console.log(data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //   FETCH DETAILS

  //CART FUNCTIONALITY
  const { fetchCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    // console.log(id)
    const quantity = 1;

    const payload = {
      productId: id,
      quantity: quantity,
    };

    try {
      const fetchApi = await fetch(summaryApi.addToCart.url, {
        method: summaryApi.addToCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await fetchApi.json();

      if (response.success) {
        toast.success(response.message);
        fetchCart();
      }
      if (response.error) {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  //CART FUNCTIONALITY

  //RECOMMENDED PRODUCTS
  const [recommended, setRecommended] = useState(null)
  // const hardId ="66733c5891afbe60f7bd9cf2"
  const getRecommendedProducts = async() => {
    try {
      const fetchApi = await fetch(summaryApi.recommendedProducts.url,{
        method: summaryApi.recommendedProducts.method,
        headers: {
          "content-type" : "application/json"
        },
        // body: JSON.stringify({id:hardId})
        body: JSON.stringify(id)
      }) 

      const response = await fetchApi.json()

      if(response.success){
        console.log(response.data)
        setRecommended(response.data)
      }

      if (response.error){
        console.log(response.message)
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  //RECOMMENDED PRODUCTS
  useEffect(() => {
    fetchProductDetails();
    getRecommendedProducts()
  }, [id]);

  return (
    <div className="productDetails">
      <div className="detailscontainer">
        <div className="top">
          <div className="topwrapper">
          <div className="left">
            <div className="imglist">
              {data?.productImage[0] &&
                data?.productImage.map((imageUrl) => {
                  return (
                    <div className="images">
                      <img src={imageUrl} alt="" />;
                    </div>
                  );
                })}
            </div>
            <div className="image">
              <img src={data?.productImage[0]} alt="" />
            </div>
          </div>
          <div className="right">
            <div className="details">
              <p>
                <span className="brandName">{data?.brandName}</span>
              </p>
              <p className="productName">{data?.productName}</p>
              <p className="decription">{data?.description}</p>
              <div className="prices">
                <p className="sellingPrice">KES {data?.sellingPrice}</p>
                <p className="price">KES {data?.price}</p>
              </div>
            </div>
            <div className="btnscontainer">
              {/* <button className="btn buy">Buy</button> */}
              <button
                className="btn cart"
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
          </div>
       
        </div>
        <div className="bottom">
        <GroupedProducts group={recommended} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
