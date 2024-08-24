import React, { useEffect, useState } from "react";
import "./FilterProducts.scss";
import { useLocation } from "react-router-dom";
import summaryApi from "../../../common";
import Productcard from "../../components/Product/Productcard";

function FilterProducts() {
  const location = useLocation();
  const query = location.search;
  const cleanQuery = query.split("=");
  const fstCartegory = cleanQuery[1];
  const finalCartegory = fstCartegory.split(",");

 

  //FILTER FUNCTIONALITY

 
  //API CALL
  const [data, setData] = useState(null);
  const fetchFilteredProducts = async () => {
    try {
      const fetchApi = await fetch(summaryApi.filterProducts.url + query);
      const response = await fetchApi.json();

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      window.alert(`${error.message}`);
    }
  };
  useEffect(() => {
    fetchFilteredProducts();
  }, [query]);

  //FILTER FUNCTIONALITY


 
  return (
    <div className="filtercontainer">
    
      <main>
        {data?.map((product) => {
          return (
            <Productcard product={product} />
          );
        })}
      </main>
    </div>
  );
}

export default FilterProducts;
