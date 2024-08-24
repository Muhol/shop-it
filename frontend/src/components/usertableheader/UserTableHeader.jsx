import React from 'react'
import "./usertableheader.scss"

function UserTableHeader() {
  return (
    <div className="usertableheaders">
            <div className="profilepic common">
              <p><b>Profile</b></p>
            </div>
            <div className="username common">
                <p><b>Username</b></p>
            </div>
            <div className="email common">
                <p><b>Email</b></p>
            </div>
            <div className="role common">
                <p>Role</p>
            </div>
            <div className="datecreated common">
                <p><b>Date Created</b></p>
            </div>
            <div className="action common">
              <p>Edit</p>
            </div>
        </div>
  )
}

export default UserTableHeader