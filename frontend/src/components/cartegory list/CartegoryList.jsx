import React, { useEffect, useState } from "react";
import "./cartegoryList.scss";
import { toast } from "react-toastify";
import summaryApi from "../../../common";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CartegoryList() {
  const [cartegories, setCartegories] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCartegories = async () => {
    try {
      setLoading(true);
      const fetchApi = await fetch(summaryApi.getProductsCartegory.url);
      const response = await fetchApi.json();

      if (response.success) {
        // toast.success(response.message);
        setCartegories(response.data);
      }
      if (response.error) {
        toast.error(response.message);
        console.log("cartegories", response.data);
      }
    } catch (error) {
      // console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartegories();
  }, []);

  //FILTER FUNCTIONALITY
  const location = useLocation();
  const query = location?.search;
  const cleanQuery = query?.split("=");
  const fstCartegory = cleanQuery[1];
  const finalCartegory = fstCartegory?.split(",");
  // console.log(location)
  // console.log(fstCartegory)


  const handleFilter = async(e, cartegory) => {
    e.preventDefault();
    // navigate(`filter/?q=${cartegory}`);
    // console.log(cartegory)
    if(fstCartegory === undefined){
      navigate(`filter/?q=${cartegory}`);
      console.log(cartegory)
    }else{
      const { value, checked } = e.target;
      try {
        if (checked) {
          if (finalCartegory[0] === "") {
            navigate(`/shop/filter/?q=${value}`);
          } else {
            navigate(`/shop/filter/?q=${[...finalCartegory, value]}`);
          }
        } else {
          const index = finalCartegory.indexOf(value);
          const unChecked = finalCartegory.splice(index, 1);
          if (unChecked) {
            navigate(`/shop/filter/?q=${finalCartegory}`);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  
//API CALL
const [data, setData] = useState(null);
// console.log(data)

  const fetchFilteredProducts = async () => {
    try {
      const fetchApi = await fetch(summaryApi.filterProducts.url + query);
      const response = await fetchApi.json();

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
//API CALL
useEffect(() => {
  fetchFilteredProducts();
}, [location]);
  //FILTER FUNCTIONALITY

  return (
    <div className="cartegoriescontainer">
      {cartegories?.map((cartegory, index) => {
        return (
          <div className="cartegoryItem">
            <label htmlFor={cartegory.cartegory}>
              <input
                type="checkbox"
                key={index}
                value={cartegory.cartegory}
                id={cartegory.cartegory}
                onClick={(e) => {
                  // filter(e)
                  handleFilter(e, cartegory.cartegory)
                }}
                checked={finalCartegory?.includes(cartegory.cartegory) && true}
              />
              <span className="checkmark"></span>
              {cartegory.cartegory}
            </label>
          </div>
        );
      })}
     
    </div>
  );
}

export default CartegoryList;
