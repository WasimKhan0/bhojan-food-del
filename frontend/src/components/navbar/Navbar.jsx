import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import logo from './logo.png'
import cart from './cart.png'
import h1 from './redheart.png'
import h2 from './emptyheart.png'


const Navbar = ({ setShowLogin, setShowAdmin, showAdmin, showLogin }) => {
  // const [menu, setMenu] = useState('home');
  // const { cartItems, addToCart, removeFromCart, url, wishList, setWishList } = useContext(StoreContext);

  const { getTotalCartAmount, token, setToken, wishList,menu,setMenu } = useContext(StoreContext);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
    localStorage.setItem('admin', 'false');
  };
  const handleAdmin = () => {
    setShowAdmin(true);
    setShowLogin(true)
  }

  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo" onClick={() => navigate('/')} />
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          home
        </Link>
        <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          mobile-app
        </a>
        <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
          contact us
        </a>
      </ul>
      <div className="navbar-right">

        {
          wishList.length === 0 ? <img src={h2} alt="" onClick={() => navigate('/wishlist')} />
            : <img src={h1} alt="" onClick={() => navigate('/wishlist')} />

        }
        <div className="navbar-search-icon">
          <img src={cart} onClick={() => navigate('/cart')} alt="" />
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {!userToken ? (

          <div className='boxa'>
            <button onClick={() => setShowLogin(true)}>sign in</button>
            <button onClick={() => handleAdmin()}>Admin</button>
          </div>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")} >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />

              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
