import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import zeroOrders from './zero-order.avif'

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url } = useContext(StoreContext);
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
        try {
            const res = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
             {data.length !== 0 ? (
                <div className="container">
                    {data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p className='food-item-quan'>{order.items.map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='zero-order'>
                    <img src={zeroOrders} alt="" />
                    <h1>No Orders </h1>
                    <p>You haven't placed any order yet.</p>
                </div>
            )}
        </div>
    );
}

export default MyOrders;
