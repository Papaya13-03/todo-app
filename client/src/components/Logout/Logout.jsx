import React from 'react'
import "../../App.css"
import { deleteToken } from '../../Logic/token'

const Logout = () => {

  const logoutHandle = ()=>{
    deleteToken();
    window.location.href = "/login"
  }

  return (
    <button className='logout-btn' onClick={()=>logoutHandle()}>Logout</button>
  )
}

export default Logout