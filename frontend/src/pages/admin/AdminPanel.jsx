import React from "react";
import "./adminpanel.scss";
import { Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";

function AdminPanel() {
  const user = useSelector((state) => state.user?.user)
  // console.log(u)
  return (
    <section>
      <aside>
        <div className="profiledetails">
          {/* <CgProfile className="icon" /> */}
          
                <>{user?.profilePic !== null ?
                (
                <div className="profileicon">
                <img src={user?.profilePic || "/Gray and Black Simple Studio Logo.jpg"} alt="" />
                 
                </div>

                ):
                (
                <div className="profileicon">
                  <CgProfile className="icon" />
                </div>
                )
                }</>
            {user && <p> {user?.username}</p>}
          
        </div>
        <div className="adminfunctions">
            <Link to={"all-users"}>
                <div className="navlink">
                    <p>All Users</p>
                </div>
            </Link>
            <Link to={"all-products"}>
                <div className="navlink">
                    <p>All Products</p>
                </div>
            </Link>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </section>
  );
}

export default AdminPanel;
