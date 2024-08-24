import React, { useState } from 'react'
import "./adminProducts.scss"
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import UpdateProduct from '../update product/UpdateProduct';

function AdminProducts({
  product,
  index, 
  fetchAllProducts,
  
}) {
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    // EDITPRODUCT
    const [editData , setEditData] = useState(null)
    
    const openUpdateProduct = () => {
      setShowUpdateProduct(!showUpdateProduct);
    };
    
    const handleOnclick = () => {
      openUpdateProduct()
      setEditData(product)
  }


  // DISCOUNT
  const discount = product.price - product.sellingPrice
  // PERCENTAGE
  const percentageDiscount = discount/product.price * 100

  // DELETE
  const Delete = () => {
    

  }
 

 
  return (
    <div className="productsAdmin">
        <div className="product">
          <div className="productImage">
            <img src={product?.productImage[0]}  alt="" />
          </div>
          <div className="details">
            <div className="left">
              <p>
                <b>{product.productName}</b>
              </p>
              <p className='descrition'>{product.description}</p>
            </div>
            <div className="right">
              <p>$ {product.sellingPrice}</p>
              <p><b>Discount $ {discount}</b></p>
            </div>
          </div>
          <div className="edit">
            <button title="Edit" className="editbtn" onClick={handleOnclick}>
              <MdEdit />
            </button>
            <button title="Delete" className="deletebtn">
              <MdDeleteForever />

            </button>
          </div>
        </div>
      {showUpdateProduct && <UpdateProduct close={openUpdateProduct} data={editData} fetchAllProducts={fetchAllProducts}/>}

      </div>
  )
}

export default AdminProducts