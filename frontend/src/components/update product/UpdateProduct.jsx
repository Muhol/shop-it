import "./UpdateProduct.scss";
import React, { useState } from "react";
// import "./addProduct.scss";
import productCategory from "../../helpers/productCartegory";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageUpload from "../../helpers/ImageUpload";
import FullScreenImage from "../fullscreen image display/FullScreenImage";
import summaryApi from "../../../common";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

function UpdateProduct({ close, data, fetchAllProducts }) {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    brandName: "",
    cartegory: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [productName, setProductName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [cartegory, setCartegory] = useState(null);
  const [productImage, setProductImage] = useState([...data.productImage]);
  const [description, setDescription] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [price, setPrice] = useState(null);
  // const [images, setImages] = useState()

  // UPDATE IMAGE
  const uploadProductImages = async (e) => {
    const image = e.target.files[0];

    const uploadImageCloudinary = await imageUpload(image);

    setProductImage((prev) => {
      return ([...prev, uploadImageCloudinary.url]);
    });
  };

  // DELETE IMAGE
  const deleteImage = async (index) => {
    const newImageList = [...productImage];
    newImageList.splice(index, 1);

    setProductImage([...newImageList])
  };

  // SHOW FULL SCREEN IMAGE
  const [openFullImage, setOpenFullImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // SHOW FULL SCREEN IMAGE

  // UPDATE PRODUCT
  const sendData = {
    _id: data._id,
    productName: productName || data.productName,
    brandName: brandName || data.brandName,
    cartegory: cartegory || data.cartegory,
    productImage: productImage,
    description: description || data.description,
    price: price || data.price,
    sellingPrice: sellingPrice || data.sellingPrice,
  };
  const updateProduct = async () => {
    const fetchApi = await fetch(summaryApi.updateProduct.url, {
      method: summaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const dataApi = await fetchApi.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllProducts();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProduct();
    } catch (error) {
      toast.error(error.message);
    } finally {
      close();
    }
  };

  return (
    <div className="UpdateProduct">
      <div className="addProduct">
        <div className="head">
          <h1>Update Product</h1>
          <div onClick={close}>
            <IoMdClose />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Change Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder={data.productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="brandName">Change Brand Name</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder={data?.brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />

          <label htmlFor="cartegory">Change Cartegory:</label>
          <select
            name="cartegory"
            id="cartegory"
            onChange={(e) => setCartegory(e.target.value)}
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
                  onChange={uploadProductImages}
                />
              </div>
            </div>
          </label>
          <div className="imageList">
            {productImage[0] ? (
              productImage.map((el, index) => {
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
                      <div className="deleteimgbtn" onClick={() => deleteImage(index)}>
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

          <label htmlFor="description">Change Description</label>
          <textarea
            className="textarea"
            // type="text"
            id="description"
            name="description"
            placeholder={data?.description}
            onChange={(e) => setDescription(e.target.value)}
            // required
          ></textarea>

          <label htmlFor="price">Change Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder={data?.price}
            onChange={(e) => setPrice(e.target.value)}
            // required
          />

          <label htmlFor="sellingPrice">Change Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder={data?.sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            // required
          />

          <button type="submit" onClick={handleSubmit}>
            Update Product
          </button>
        </form>
        {/* full screen image */}

        <div className="fullimagediplay"></div>

        {/* full screen image */}
      </div>
    </div>
  );
}

export default UpdateProduct;
