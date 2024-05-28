import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from "../src/pages/verify/Verify"
import MyOrders from './pages/MyOrders/MyOrders'
import Admin from './pages/Admin/Admin'
import AdminNavbar from './adminComponents/AdminNavbar/AdminNavbar'
import { StoreContext } from './Context/StoreContext'
import Showbox from './components/Showbox/Showbox'
import WishList from './pages/WishList/WishList'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const location = useLocation();
  const { showBox, setShowBox } = useContext(StoreContext);
  useEffect(() => {
    setIsAdminLogged(localStorage.getItem('admin') === 'true');
  }, [location]);

  return (
    <>

      {showBox && <Showbox showBox={showBox} setShowBox={setShowBox} />}
      {
        showBox ? <Showbox showBox={showBox} setShowBox={setShowBox} /> : <>
          {showLogin && <LoginPopup setShowLogin={setShowLogin} setShowAdmin={setShowAdmin} showAdmin={showAdmin} showLogin={showLogin} />}
          <div className='app'>
            {isAdminLogged ? <AdminNavbar /> : <Navbar setShowLogin={setShowLogin} setShowAdmin={setShowAdmin} showAdmin={showAdmin} showLogin={showLogin} />}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<PlaceOrder />} />
              <Route path='/verify' element={<Verify />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/wishlist' element={<WishList />} />
              {isAdminLogged && <Route path='/admin/*' element={<Admin />} />}
            </Routes>
          </div>
          <Footer />
        </>
      }

    </>
  )
}

export default App
