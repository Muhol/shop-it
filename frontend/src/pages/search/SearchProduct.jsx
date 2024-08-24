import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./searchProducts.scss";
import summaryApi from "../../../common";
import Productcard from "../../components/Product/Productcard";

function SearchProduct() {
  //SEARCH RESULTS
  const [data, setData] = useState(null);
  const query = useLocation();
  const fetchResults = async () => {
    try {
      const fetchApi = await fetch(
        summaryApi.searchProducts.url + query.search
      );
      const response = await fetchApi.json();

      if (response.success) {
        setData(response.data);
      }
      if (response.error) {
        window.alert(`${response.message}`);
      }
    } catch (error) {
      window.alert(`${error.message}`);
    }
  };
  //SEARCH RESULTS



  //useEffect
  useEffect(() => {
    fetchResults();
  }, [query]);
  return (
    <div className="searchPageCont">
        {data?.length===0? (
          <p><b>No Results </b></p>
          ):(
          <p><b>Search Results </b></p>
          )
        }
      <div className="searchContWrapper">

      {data?.map((product) => {
        return (
          <Productcard product={product} />
        );
      })}
      </div>
    </div>
  );
}

export default SearchProduct;
