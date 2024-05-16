import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const placeOrder = async (e) => {
    e.preventDefault();
    //  console.log(food_list);
    //  console.log(cartItems);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let res = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(res.data.success){
      const {session_url} = res.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First name' />
          <input required type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='last name' />
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' />
        <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
          <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='Zip code' />
          <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
