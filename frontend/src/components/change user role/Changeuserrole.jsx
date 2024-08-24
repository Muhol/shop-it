import React, { useEffect, useState } from "react";
import "./changeuserrole.css";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../../../common";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";

function Changeuserrole({
  close,
  user,
  show,
  setUserDisplayDetails,
  fetchUsers,
  setUsers,
}) {
  const handleClose = () => {
    setUserDisplayDetails(null);
    console.log("user", user);
    close();
  };
  const [newRole, setNewRole] = useState("");

  const changeRole = (e) => {
    setNewRole(e.target.value);
    console.log(newRole);
  };

  const newUserDetails = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    profilePic: user?.profilePic,
    role: newRole,
  };

  const updateUser = async () => {
    try {
      const fetchdata = await fetch(summaryApi.updateUser.url, {
        method: summaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUserDetails),
      });

      // console.log(newUserDetails)
      const resData = await fetchdata.json();

      if (resData.success) {
        toast.success(resData.message);
        // setUsers(null)
        console.log("updated user details...////", resData.data);
        close();
      }

      if (resData.error) {
        toast.error(resData.message);
      }
    } catch (error) {
      console.log("error", error.message)
    }finally{
      fetchUsers();
    }
  };

  if (user !== null) {
    return (
      <>
        <div className="changeuserCont">
          <div className="changeuserrole">
            <div className="close" onClick={handleClose}>
              <IoMdClose />
            </div>
            <p>
              <b>Change this User's Role:</b>
            </p>
            <p>
              Name:
              <span> {user?.username}</span>
            </p>
            <p>
              Email:
              <span> {user?.email}</span>
            </p>
            <div className="rolechange">
              <p>Role: {user?.role}</p>
              <select
                // name="user role"
                id="channgeUserRole"
                onChange={changeRole}
                // value={""}
              >
                <option value="GENERAL">GENERAL</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button onClick={updateUser}>Change Role</button>
          </div>
        </div>
      </>
    );
  } else if (user === null) {
    return (
      <div className="loadcontainer">
        <div className="loadcomponent">
          <Loading />
        </div>
      </div>
    );
  }
}

export default Changeuserrole;
