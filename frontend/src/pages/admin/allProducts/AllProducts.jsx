import React, { useEffect, useState } from "react";
import "./allproducts.scss";
import { AddProduct } from "../../../components/addProduct/AddProduct";
import summaryApi from "../../../../common";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import AdminProducts from "../../../components/Admin Products/AdminProducts";
import UpdateProduct from "../../../components/update product/UpdateProduct";

function AllProducts() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [data, setData] = useState(null);

  const openAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  // DISPLAYING ALL PRODUCTS
  const fetchAllProducts = async () => {
    const fetchApi = await fetch(summaryApi.getProducts.url, {
      method: summaryApi.getProducts.method,
    });

    const response = await fetchApi.json();
    setData(response?.data);

    if (response.success) {
      // toast.success(response.message);
      // console.log("products", response.data);
      const products = response.data;
      // console.log("products", products)
      setData(products);

      // console.log(data);
    }
    if (response.error) {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  // DISPLAYING ALL PRODUCTS

  return (
    <div className="allProductsContainer">
      <div className="header">
        <div className="left">
          <h1>All Products </h1>
        </div>
        <div className="right">
          <button className="uploadButton" onClick={openAddProduct}>
            Upload Product
          </button>
        </div>
      </div>

      <div className="productlist">
        {data?.map((product, index) => {
          return (
            <AdminProducts
              product={product}
              index={index}
              key={product._id}
              fetchAllProducts={fetchAllProducts}
            />
          );
        })}
      </div>

      {/* {showUpdateProduct && <UpdateProduct close={openUpdateProduct} />} */}
      {showAddProduct && (
        <AddProduct
          close={openAddProduct}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
}

export default AllProducts;
