import React, { useContext } from 'react'
import './AdminNavbar.css'
import { assets } from "../../adminAssets/assets"
import { useNavigate } from 'react-router-dom'
 import { StoreContext } from '../../Context/StoreContext'
import logo from  '../../components/navbar/logo.png'
const AdminNavbar = () => {
  const { setToken } = useContext(StoreContext)
  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
    localStorage.setItem('admin', false);
   };
  return (
    <>

      <div className='admin-navbar'>
        <img className='logo' src={logo} alt="" />
        <div className="right-box">
          <img className='profile' src={assets.profile_image} alt="" />
          <h3  onClick={adminLogout}>Logout</h3>

        </div>

      </div>



    </>
  )
}

export default AdminNavbar
