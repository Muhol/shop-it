import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Login from "./pages/login/Login";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Signup from "./pages/Sign up/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import summaryApi from "../common";
import Context from "./context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/admin/AdminPanel";
import Allusers1 from "./pages/admin/allUsers/Allusers1";
import AllProducts from "./pages/admin/allProducts/AllProducts";
import ProductDetails from "./pages/product Details/ProductDetails";
import Cart from "./pages/cart/Cart";
import SearchProduct from "./pages/search/SearchProduct";
import FilterProducts from "./pages/FilterProducts/FilterProducts";
import Success from "./pages/success/success";
import Orders from "./pages/orders/Orders";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing page/LandingPage";
import Allproducts from "./pages/home/all products/Allproducts";

const General = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "",
    element: <General />,
    children: [
      {
        path: "shop",
        element: <Home />,
        children:[
          {
            path: "",
            element: <Allproducts />,
          },
          {
            path: "search",
            element: <SearchProduct />,
          },
          {
            path: "filter",
            element: <FilterProducts />,
          },
        ]
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
     
      {
        path: "admin",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <Allusers1 />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "password-reset",
    element: <Forgotpassword />,
  },
]);
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.user);

  //FETCH USER DETAILS
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    if (dataApi.error) {
      // window.alert(`${dataApi.message}`)
    }

  };
  //FETCH USER DETAILS

  //FETCH CART
  const [cart, setCart] = useState(null);
  const fetchCart = async () => {
    try {
      const fetchApi = await fetch(summaryApi.countCartItems.url, {
        method: summaryApi.countCartItems.method,
        credentials: "include",
      });

      const response = await fetchApi.json();

      if (response.success) {
        setCart(response.data[0]);
      
      }
    } catch (error) {
      window.alert(`${error.message}`)
    }
  };
  //FETCH CART

  useEffect(() => {
    fetchUserDetails();
    fetchCart();
  }, []);

  return (
    <div className="mainContainer">
      <div className="mainWrapper">
        <Context.Provider
          value={{
            fetchUserDetails,
            cart,
            fetchCart,
            user,
          }}
        >
          <ToastContainer position="top-center" theme="dark" />
          <RouterProvider router={router} />
        </Context.Provider>
      </div>
    </div>
  );
}

export default App;
