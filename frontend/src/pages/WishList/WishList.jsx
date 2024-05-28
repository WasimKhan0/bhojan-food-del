import React, { useContext } from 'react';
import './WishList.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import emptyImg from './empty-wish.avif'
import axios from 'axios';

const WishList = () => {
    const { cartItems, addToCart, removeFromCart, url, wishList, setWishList } = useContext(StoreContext);
    const removeWishItem = async (id) => {
        const token = localStorage.getItem('token');
        try {

            const res = await axios.post(url + `/api/user/removewish/${id}`, {}, { headers: { token } })
            setWishList(res.data.data)
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <div className='wrapper'>


            {wishList?.length === 0 ? (
                <div className="box-empty-wish">
                    <img src={emptyImg}></img>
                    <p className="wishlist-empty">Nothing here yet</p>
                </div>

            ) :


                <div className="container">
                    {
                        wishList?.map((item, index) => {
                            return (
                                <div className='box'>
                                    <div className='big-image'>
                                        <img src={`${url}/images/${item.image}`} alt={item.name} className="food-item-image" />

                                        {!cartItems[item.id]
                                            ? <img className='add' onClick={() => addToCart(item.id)} src={assets.add_icon_white} alt="Add to Cart" />
                                            : <div className='counter'>
                                                <img onClick={() => removeFromCart(item.id)} src={assets.remove_icon_red} alt="Remove from Cart" />
                                                <p>{cartItems[item.id]}</p>
                                                <img onClick={() => addToCart(item.id)} src={assets.add_icon_green} alt="Add more to Cart" />
                                            </div>
                                        }
                                        <h3 className='cross' onClick={() => removeWishItem(item.id)}>X</h3>
                                    </div>
                                    <div className="content">
                                        <div className="rating">
                                            <p>{item.name}</p>
                                        </div>
                                        <p className="desc">{item.description}</p>
                                        <p className="price">${item.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }




                </div>

            }

        </div>
    );
};

export default WishList;
