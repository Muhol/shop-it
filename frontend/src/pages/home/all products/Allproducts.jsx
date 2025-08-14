import React, { useEffect, useState } from "react";
import Productcard from "../../../components/Product/Productcard";
import summaryApi from "../../../../common";
import { toast } from "react-toastify";

function Allproducts() {
     // FETCHING PRODUCTS
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const fetchApi = await fetch(summaryApi.getProducts.url);
      const response = await fetchApi.json();

      if (response.success) {
        // toast.success(response.message);
        setProducts(response.data);
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

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="wrapper">
      {products?.map((product, index) => {
        return <Productcard product={product} key={product._id} />;
      })}
    </div>
  );
}

export default Allproducts;
