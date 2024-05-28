import React, { useContext, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from "../../Context/StoreContext";
import emptyCartImg from './empty-cart.avif'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <>
      {
        getTotalCartAmount()  !== 0 ? <div className='cart'>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {
              food_list.map((item, index) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div>
                      <div className="cart-items-title cart-items-item">
                        <p>{item.name}</p>
                        <img src={url + `/images/` + item.image} ></img>
                        <p>${item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>${item.price * cartItems[item._id]}</p>
                        <p className='remove-it' onClick={() => removeFromCart(item._id)}>x</p>
                      </div>
                      <hr />

                    </div>


                  )
                }
              })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className='cart-total-details'>
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Total</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                </div>
              </div>
              <button onClick={() => navigate('/order')}>PROCEED TO CHECK</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='promo code' />
                  <button>Submit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
          :
          <div className='empty-cart'>
            <img src={emptyCartImg} alt="" />
            <h1>Your cart is empty</h1>
            <p>You can go to home page to view more meals</p>
          </div>
      }

    </>
  )
}

export default Cart