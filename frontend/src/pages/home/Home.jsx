import React, { useEffect, useState } from "react";
import Productcard from "../../components/Product/Productcard";
import "./home.scss";
import CartegoryList from "../../components/cartegory list/CartegoryList";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

function Home() {
  // FETCHING PRODUCTS
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const fetchApi = await fetch(summaryApi.getProducts.url);
      const response = await fetchApi.json();

      if (response.success) {
        toast.success(response.message);
        setProducts(response.data);
        // console.log(response.data)
      }

      if (response.error) {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };
  // FETCHING PRODUCTS

  //FETCHING PRODUCTS CARTEGORY WISE
  const [groupedProducts, setGroupedProducts] = useState([]);
  const fetchGroupedProducts = async () => {
    try {
      const fetchData = await fetch(summaryApi.getProductsCartegoryWise.url);

      const response = await fetchData.json();

      if (response.success) {
        toast.success(response.message);
        setGroupedProducts(response.data);
        console.log(groupedProducts);
      }
    } catch (error) {
      console.log("error", error.message);
    } finally {
    }
  };
  //FETCHING PRODUCTS CARTEGORY WISE

  
  useState(() => {
    fetchProducts();
    fetchGroupedProducts();
  }, []);

  return (
    <div className="homepage">
      <div className="productscontainer">
        <div className="toptrack">
          <div className="line">
            <p>Home </p>
            <SlArrowRight />
            <p>All Products </p>
          </div>
        </div>

        <div className="section products">
          <div className="leftWrap">
            <div className="wrap">
              <div className="heading">
                <p>Filter By</p>
              </div>
              
              <div className="filter1">
                <li>Cartegory</li>
                <div className="filterbox">
                  <CartegoryList />
                </div>
              </div>
              <div className="filter1">
                <li>Price</li>
                <div className="filterbox">
                  <div className="bracket">
                    <label htmlFor="lowest">Low</label>
                    <input type="number" id="lowest" min={0} />
                  </div>
                  <div className="bracket">
                    <label htmlFor="highest">High</label>
                    <input type="number" id="highest" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Outlet products={products}  />

          {/* <Allproducts products={products} /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
