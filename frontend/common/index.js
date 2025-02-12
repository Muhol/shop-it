const backendDomain= `${import.meta.env.VITE_BACKEND_URL}`

const summaryApi = {
    signUp : {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn : {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    currentUser : {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logOut : {
        url: `${backendDomain}/api/user-logout`,
        method: "get"
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    getUserDetails : {
        url: `${backendDomain}/api/get-user-details`,
        method: "post"
    },
    allUsers : {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    uploadProduct : {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    updateProduct : {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    getProducts : {
        url: `${backendDomain}/api/get-products`,
        method: "get"
    },
    getProductsCartegory  : {
        url: `${backendDomain}/api/get-products-cartegory`,
        method: "get"
    },
    getProductsCartegoryWise  : {
        url: `${backendDomain}/api/products-cartegory`,
        method: "get"
    },
    getDetailedProduct  : {
        url: `${backendDomain}/api/product-detailed`,
        method: "post"
    },
    recommendedProducts  : {
        url: `${backendDomain}/api/recommended-products`,
        method: "post"
    },
    addToCart  : {
        url: `${backendDomain}/api/add-to-cart`,
        method: "post"
    },
    countCartItems  : {
        url: `${backendDomain}/api/count-cart`,
        method: "get"
    },
    deleteCartItem  : {
        url: `${backendDomain}/api/delete-cart-item`,
        method: "post"
    },
    updCartItemQuantity  : {
        url: `${backendDomain}/api/update-cart-item-quantity`,
        method: "post"
    },
    searchProducts  : {
        url: `${backendDomain}/api/search-products`,
        method: "get"
    },
    filterProducts  : {
        url: `${backendDomain}/api/filter-products`,
        method: "get"
    },
    checkout : {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    deleteCart : {
        url: `${backendDomain}/api/delete-cart`,
        method: "get"
    },
    getSingleUserOrders : {
        url: `${backendDomain}/api/get-user-orders`,
        method: "get"
    }
}
export default summaryApi