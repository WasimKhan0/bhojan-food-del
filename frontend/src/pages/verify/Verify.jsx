import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // console.log(token)
  const verifyPayment = async () => {
    try {
      const res = await axios.post(url + '/api/order/verify', { success, orderId },{headers:{token}});
      console.log(res)
      if (res.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    verifyPayment();
    console.log(success,orderId);
  },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
