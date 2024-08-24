import express from  "express"
import userSignUpController from "../controller/user/userSignUp.mjs";
import userSignInController from "../controller/user/userSignIn.mjs";
import userDetailsContoller from "../controller/user/userDetails.mjs";
import authToken from "../middleware/authToken.mjs";
import userLogoutController from "../controller/user/userLogout.mjs";
import allUsersController from "../controller/user/allUser.mjs";
// import updateUserController from "../controller/updateUser.mjs";
import getUserDetailsController from "../controller/user/getUserDetails.mjs";
import updateUser from "../controller/product/updateUser.mjs";
import UploadProductController from "../controller/product/uploadProduct.mjs";
import getProductController from "../controller/product/getProducts.mjs";
import updateProductController from "../controller/product/updateProduct.mjs";
import getProductCartegoryController from "../controller/product/getProductCartegory.mjs";
import getProductsCartegoryWise from "../controller/product/getProductsCartegoryWise.mjs";
import getSingleProductDetails from "../controller/product/singleProductDetails.mjs";
import addToCartController from "../controller/user/addToCart.mjs";
import cartProducts from "../controller/user/countCartProducts.mjs";
import deleteCartItem from "../controller/user/deletCartItem.mjs";
import updateCartQuantity from "../controller/user/updateCartQuantity.mjs";
import searchProducts from "../controller/product/searchProducts.mjs";
import filterByCartegories from "../controller/product/filterByCartegories.mjs";
import recommendedProducts from "../controller/product/productDetailsRecommended.mjs";
import stripePaymentController from "../controller/payment/stripePayment.mjs";
import deleteCart from "../controller/user/deleteCart.mjs";
import ordersController from "../controller/user/orders.mjs";
import webhook from "../controller/payment/webhook.mjs";
import getUserOrdersController from "../controller/user/getUserOrders.mjs";

const router = express.Router();
// USER
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsContoller )
router.get("/user-logout",userLogoutController )
router.get("/all-users",authToken, allUsersController )
router.post("/update-user",authToken,updateUser )
router.post("/get-user-details", getUserDetailsController )
//getuserorders 
router.get("/get-user-orders", authToken, getUserOrdersController )

// PRODUCT
router.post("/upload-product",authToken,UploadProductController )
router.post("/update-product",authToken,updateProductController )
router.get("/get-products",getProductController )
router.get("/get-products-cartegory",getProductCartegoryController )
router.get("/products-cartegory",getProductsCartegoryWise )
router.post("/product-detailed",getSingleProductDetails )
router.post("/recommended-products",recommendedProducts )

//add to cart
router.post("/add-to-cart",authToken,addToCartController )
router.get("/count-cart",authToken,cartProducts)
router.post("/delete-cart-item",authToken,deleteCartItem)
router.post("/update-cart-item-quantity",authToken,updateCartQuantity)
//delete cart
router.get("/delete-cart",authToken,deleteCart)
router.get("/create-order",authToken,ordersController)

//SEARCH FUNCTIONALITY
router.get("/search-products",searchProducts)

//FILTER FUNCTIONALITY
router.get("/filter-products",filterByCartegories)

//PAYMENT FUNCTIONALITY
router.post("/checkout", authToken, stripePaymentController)
// router.post("/checkout",stripePaymentController)
router.post("/webhook",webhook)






    
export default router