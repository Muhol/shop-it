import React, { useState } from "react";
import "./addProduct.scss";
import productCategory from "../../helpers/productCartegory";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageUpload from "../../helpers/ImageUpload";
import FullScreenImage from "../fullscreen image display/FullScreenImage";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
export const AddProduct = ({ close, fetchAllProducts }) => {
  //FUNCTIONS

  const [productDetails, setProductDetails] = useState({
    productName: "",
    brandName: "",
    cartegory: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  // SHOW FULL SCREEN IMAGE
  const [openFullImage, setOpenFullImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // SHOW FULL SCREEN IMAGE

  //HANDLE ONCHANGE

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //HANDLE ONCHANGE

  const handleUploadProduct = async (e) => {
    try {
      const image = e.target.files[0];
      // console.log("image")
      const uploadImageCloudinary = await imageUpload(image);
      setProductDetails((prev) => {
        return {
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url],
        };
      });
      // console.log("upload image", productDetails.productImage);
    } catch (error) {
      toast.error("message", error.message)
      console.log(error)
    }
  };

  // UPLOADING THE PRODUCT

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchApi = await fetch(summaryApi.uploadProduct.url, {
        method: summaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });
  
      const response = await fetchApi.json();
  
      if (response.success) {
        toast.success(response.message);
        close();
      }
      if (response.error) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error( "message:", error.message)
      console.log( "message:", error.message)
    }finally{
      fetchAllProducts()
    }

  };
  // UPLOADING THE PRODUCT

  // DELETING IMAGE
  const handleDelete = async(index) => {
    const Imagelist = [...productDetails.productImage]
    Imagelist.splice(index, 1)

    setProductDetails((prev) => {
      return {
        ...prev,
        productImage: [...Imagelist],
      };
    });

  }

  return (
    <div className="addProductsContainer">
      <div className="addProduct">
        <div className="head">
          <h1>Upload Product</h1>
          <div onClick={close}>
            <IoMdClose />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name...."
            onChange={handleOnChange}
            required
          />
          <label htmlFor="brandName">Brand Name</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter product name...."
            onChange={handleOnChange}
            required
          />

          <label htmlFor="cartegory">Cartegory:</label>
          <select
            name="cartegory"
            id="cartegory"
            onChange={handleOnChange}
            required
          >
            {productCategory.map((el) => {
              return (
                <option value={el.value} key={el.id}>
                  {" "}
                  {el.label}
                </option>
              );
            })}
          </select>

          <label className="imageUploadlabel" htmlFor="productImages">
            Product Images :
            <div className="images">
              <div className="uploadImage">
                <span>
                  <FaCloudUploadAlt />
                </span>
                <p>Upload Product Images</p>
                <input
                  type="file"
                  id="productImages"
                  name="productImages"
                  onChange={handleUploadProduct}
                  required
                />
              </div>
            </div>
          </label>
          <div className="imageList">
            {productDetails?.productImage[0] ? (
              productDetails.productImage.map((el, index) => {
                return (
                  <div className="images">
                    <div className="img">
                      <img
                        className="listedimage"
                        src={el}
                        key={index}
                        alt=""
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullImage(true);
                        }}
                      />
                      <div className="delImg" onClick={() => handleDelete(index)}>
                      <MdDeleteForever />
                      </div>
                    </div>

                    {openFullImage && (
                      <FullScreenImage
                        imageUrl={fullScreenImage}
                        onClose={() => setOpenFullImage(false)}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <>
                <p>*please add image(s) for the product</p>
              </>
            )}
          </div>

          <label htmlFor="description">Description</label>
          <textarea
            className="textarea"
            // type="text"
            id="description"
            name="description"
            // placeholder="Enter the description...."
            onChange={handleOnChange}
            required
          ></textarea>

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter the price...."
            onChange={handleOnChange}
            required
          />

          <label htmlFor="sellingPrice">Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter the selling price...."
            onChange={handleOnChange}
            required
          />

          <button type="submit" onClick={handleSubmit}>
            Upload Product
          </button>
        </form>
        {/* full screen image */}

        <div className="fullimagediplay"></div>

        {/* full screen image */}
      </div>
    </div>
  );
};
