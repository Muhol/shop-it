import React, { useEffect, useRef, useState } from "react";
import "./users.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import Changeuserrole from "../change user role/Changeuserrole";
import summaryApi from "../../../common";
import { toast } from "react-toastify";

function Users({ user, open, show, fetchUsers, setUsers }) {
  const [userDisplayDetails, setUserDisplayDetails] = useState(null);
  // const [shouldExecute, setShouldExecute] = useState(true);
  // const cancelToken = useRef(false);

  const userdata = {
    email: user.email,
    name: user.username,
    role: user.role,
    _id: user._id,
    // profilePic: user.profilePic,
  };

  const displayUserDetails = async () => {
    // if (!shouldExecute) {
      // console.log("Function execution prevented by state");
      // return;
    // }
    const fetchData = await fetch(summaryApi.getUserDetails.url, {
      method: summaryApi.getUserDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    const dataRes = await fetchData.json();

    if (dataRes.success) {
      setUserDisplayDetails(dataRes.data);
      // toast.success(dataRes.message);
      // console.log("display user", dataRes.data);
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
      // setUserDisplayDetails(dataRes.data)
      // console.log("display user", dataRes.data)
    }
  };
  const openChangeRole = async () => {
    // cancelToken.current = false;

    // setShouldExecute(true)
    setUserDisplayDetails(null);
    displayUserDetails();
    open();
    // if(shouldExecute && userDisplayDetails===null){
    // }
  };

  return (
    <div className="user">
      <div className="usertablecontent">
        <div className="profilepic common">
          <img
            src={user?.profilePic || "/Gray and Black Simple Studio Logo.jpg"}
            alt=""
          />

          {/* (<CgProfile/>) */}
        </div>
        <div className="username common">
          <p>{user.username}</p>
        </div>
        <div className="email common">
          <p>{user.email}</p>
        </div>
        <div className="role common">
          <p>{user.role}</p>
        </div>
        <div className="datecreated common">
          <p>{moment(user.createdAt).format("LL")}</p>
        </div>
        <div className="action common" onClick={() => openChangeRole()}>
          <MdEdit />
        </div>
        {show && (
          //  userDisplayDetails &&
          <>
            <Changeuserrole
              close={open}
              user={userDisplayDetails}
              show={show}
              setUserDisplayDetails={setUserDisplayDetails}
              showId={openChangeRole}
              // execute={setShouldExecute}
              // cancelToken={cancelToken}
              fetchUsers={fetchUsers}
              setUsers={setUsers}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
