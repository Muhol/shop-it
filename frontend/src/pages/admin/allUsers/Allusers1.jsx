import React, { useEffect, useState } from "react";
import "./allusers1.scss";
import Users from "../../../components/user/Users";
import summaryApi from "../../../../common";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";
import UserTableHeader from "../../../components/usertableheader/UserTableHeader";
import { IoMdClose } from "react-icons/io";
import Changeuserrole from "../../../components/change user role/Changeuserrole";

function Allusers1() {
  const [users, setUsers] = useState(null);

  const fetchAllUsers = async () => {
    const fetchUsers = await fetch(summaryApi.allUsers.url, {
      method: summaryApi.allUsers.method,
      credentials: "include",
    });

    const dataApi = await fetchUsers.json();

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
    if (dataApi.success) {
      toast.success(dataApi.message);
      const usersData = dataApi.data;
      setUsers(usersData);
      // console.log(users)
    }
  };

  const [showChangeRole, setShowChangeRole] = useState(false);

  const handleOpenAndClose = () => {
    setShowChangeRole(!showChangeRole);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="allusers">
      {/* {users !== null ? ( */}
        <>
          <UserTableHeader />
          {users?.map((user) => (
            <Users
              key={user._id}
              user={user}
              open={handleOpenAndClose}
              show={showChangeRole}
              fetchUsers={fetchAllUsers}
              setUsers={setUsers}
            />
          ))}
        </>
      {/* // ) : (
      //   <>
      //     <Loading />
      //   </>
      // )} */}
    </div>
  );
}

export default Allusers1;
