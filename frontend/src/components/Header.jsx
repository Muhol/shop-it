import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const context = useContext(Context);
  //LOGOUT FUNCTIONALITY
  const handleLogout = async (e) => {
    e.preventDefault();

    const logout = await fetch(summaryApi.logOut.url, {
      method: summaryApi.logOut.method,
      credentials: "include",
    });

    const dataApi = await logout.json();

    if (dataApi.success) {
      dispatch(setUserDetails(null));
    }

    if (dataApi.error) {
      window.alert(`${dataApi.message}`);
    }
  };
  //LOGOUT FUNCTIONALITY

  //SEARCH FUNCTIONALITY
  const [searchValue, setSearchValue] = useState("")
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue !== "") {
        navigate(`/shop/search?q=${searchValue}`);
      }
    } catch (error) {
      window.alert(`${error.message}`);
    }
  };
  //SEARCH FUNCTIONALITY

  useEffect(() => {
    if (user) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [user]);
  return (
    <header>
      <div className="headercontainer">
        <div className="left">
          <Link to={"shop"}>
            <div className="logo">
              <img src="/headerlogo.png" alt="" />
            </div>
          </Link>
        </div>
        <div className="middle">
          <div className="search">
            <form onSubmit={(e) => handleSearch(e)}>
              <input type="text" placeholder="Search Products here..."  onChange={(e) => setSearchValue(e.target.value)}/>
              <button type="submit">
                <FiSearch />
              </button>
            </form>
            <div className="searchicon"></div>
          </div>
        </div>
        <div className="right">
          <div className="navlinks">
            <Link to={"/"}>Home</Link>
            <Link to={"shop"}>Shop</Link>
            {/* <Link to={"#"}>Contact Us </Link> */}
          </div>

          <div className="usericons">
            <div className="profile">
              {user?.profilPic !== undefined || null || "" ? (
                <>
                  <div className="profileicon">
                    <img src={user?.profilePic} alt="" className="icon" />
                    {showMenu && toggleMenu && (
                      <div className="menu">
                        <nav>
                          <Link to={"/profile-setting"}>
                            <div className="navlink">
                              <p>Profile</p>
                            </div>
                          </Link>
                          {user?.role === "ADMIN" && (
                            <Link to={"/admin"}>
                              <div className="navlink">
                                <p>Admin Panel</p>
                              </div>
                            </Link>
                          )}
                          <button onClick={handleLogout}>Logout</button>
                        </nav>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="profileicon">
                  {/* <CgProfile className="icon" /> */}
                  <p className="icon" onMouseEnter={() => setToggleMenu(true)}>
                    Profile
                  </p>
                  {showMenu && toggleMenu && (
                    <div
                      className="menu"
                      onMouseLeave={() => setToggleMenu(false)}
                    >
                      <nav>
                        <Link to={"/profile-setting"}>
                          <div className="navlink">
                            <p>Profile Settings</p>
                          </div>
                        </Link>

                        {user?.role === "ADMIN" && (
                          <Link to={"/admin/all-products"}>
                            <div className="navlink">
                              <p>Admin Panel</p>
                            </div>
                          </Link>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="cart">
              <Link to="/cart">
                {/* <LuShoppingCart /> */}
                <p>
                  Cart(
                  {context?.cart !== undefined &&
                    context?.cart?.items.length > 0 &&
                    context?.cart.items?.length}
                  )
                </p>
              </Link>
            </div>
          </div>
          {user === null && (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
