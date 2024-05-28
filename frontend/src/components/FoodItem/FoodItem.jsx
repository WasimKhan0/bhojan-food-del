import React, { useContext, useEffect, useState } from 'react'
import "./FoodItem.css"
import { StoreContext } from "../../Context/StoreContext"
import { assets } from '../../assets/assets'
import h1 from './heart.png'
import h2 from './love.png'
import star0 from '../Showbox/star-assets/star-0.png'
import star0h from '../Showbox/star-assets/star-0.5.png'
import star1 from '../Showbox/star-assets/star-1.png'
import star1h from '../Showbox/star-assets/star-1.5.png'
import star2 from '../Showbox/star-assets/star-2.png'
import star2h from '../Showbox/star-assets/star-2.5.png'
import star3 from '../Showbox/star-assets/star-3.png'
import star3h from '../Showbox/star-assets/star-3.5.png'
import star4 from '../Showbox/star-assets/star-4.png'
import star4h from '../Showbox/star-assets/star-4.5.png'
import star5 from '../Showbox/star-assets/star-5.png'
import axios from 'axios'
const FoodItem = ({ id, name, price, description, image, actRating }) => {
     const { food_list, cartItems, addToCart, removeFromCart, url, setItemId, setShowBox, wishList, setWishList } = useContext(StoreContext)
    // const token = localStorage.getItem('token');
    if (!food_list || !cartItems) {
        return null;
    }
    const foodItem = {
        id: id,
        name: name,
        price: price,
        description: description,
        image: image,
        actRating: actRating
    };
    
    const [heart, setHeart] = useState(h2)
    const handleWish = async (token) => {
        if(token){
            if(heart===h1)
                setHeart(h2);
            else setHeart(h1);
             try {
                const res = await axios.post(url + '/api/user/addwish', { foodItem }, { headers: { token } });
                setWishList(res.data.data)
                console.log(res.data)
             } catch (err) {
                console.log(err);
            }
        }else{
            alert('Login first')
        }
             
  }
 
    function getStarImage(rating) {
        // Convert rating to a number
        const numRating = parseFloat(rating);
        // Determine the appropriate star image based on the rating
        if (numRating === 0) {
            return star0;
        } else if (numRating > 0 && numRating < 1) {
            return star0h;
        } else if (numRating === 1) {
            return star1;
        } else if (numRating >= 1 && numRating < 2) {
            return star1h;
        } else if (numRating === 2) {
            return star2;
        } else if (numRating > 2 && numRating < 3) {
            return star2h;
        } else if (numRating === 3) {
            return star3;
        } else if (numRating > 3 && numRating < 4) {
            return star3h;
        } else if (numRating === 4) {
            return star4;
        } else if (numRating > 4 && numRating < 5) {
            return star4h;
        }
        else if (numRating === 5) {
            return star5;
        }
    }

    const starImage = getStarImage(actRating);
    const temp = () => {
        setItemId(id);
        setShowBox(true);
    }
    
    return (
        <div className='food-item'>

            <div className="food-item-img-container">
                <img onClick={() => temp()} src={url + `/images/` + image} alt="" className="food-item-image" />
 

                 {
                    wishList?.findIndex(item => 
                        item.id === id
                     )!==-1?<img onClick={() => { handleWish(localStorage.getItem('token')) }} className='love' src={h1}></img>:
                    <img onClick={() => { handleWish(localStorage.getItem('token')) }} className='love' src={h2}></img>

                 }
                 {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white}></img>
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red}></img>
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green}></img>
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={starImage}></img>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>

        </div>
    )
}

export default FoodItem