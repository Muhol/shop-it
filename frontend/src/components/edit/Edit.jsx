import React from 'react'
import { MdEdit } from 'react-icons/md'
import Changeuserrole from '../change user role/Changeuserrole'

function Edit({open, userdata, show}) {
  return (
    <div>
         <div className="action common" onClick={open}>
          <MdEdit />
          {show && <Changeuserrole close={open} user={userdata} />
          }
           {/* <Changeuserrole close={open} user={userdata} /> */}
        </div>
    </div>
  )
}

export default Edit