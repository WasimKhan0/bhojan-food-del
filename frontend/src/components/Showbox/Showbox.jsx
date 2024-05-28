import React, { useContext, useEffect, useState } from 'react'
import './Showbox.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import star0 from './star-assets/star-0.png'
import star0h from './star-assets/star-0.5.png'
import star1 from './star-assets/star-1.png'
import star1h from './star-assets/star-1.5.png'
import star2 from './star-assets/star-2.png'
import star2h from './star-assets/star-2.5.png'
import star3 from './star-assets/star-3.png'
import star3h from './star-assets/star-3.5.png'
import star4 from './star-assets/star-4.png'
import star4h from './star-assets/star-4.5.png'
import star5 from './star-assets/star-5.png'
const Showbox = () => {
    const { showBox, setShowBox, itemId, url } = useContext(StoreContext);
    const userId = localStorage.getItem('token');
    const [item, setItem] = useState([]);
    const [rating, setRating] = useState();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [wanaReview, setWanaReview] = useState(false);

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



    const starImage = getStarImage(item.actRating);
    const getItem = async () => {
        try {
            const res = await axios.get(url + `/api/food/get/${itemId}`);
            setItem(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    const updateRatings = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url + `/api/food/rating`, {
                itemId,
                rating,
                userId,
                title,
                desc
            });
            if (!res.data.success) {
                alert(res.data.message);
            }
            setTitle("");
            setDesc("");
            setRating(0);

        } catch (err) {
            console.log(err);
        }
    }
    const solve=()=>{
        if(localStorage.getItem('token')){
            setWanaReview(true);
        }
        else{
            alert('login first');
        }
    }
    useEffect(() => {
        getItem();
    }, [item])
    return (
        <>

            <div className='food-box'>

                <div className="box-container">
                    <div className="nav">
                        <h1 className='reviews'>Customer reviews</h1>
                        <h1 className='cross-showBox' onClick={() => { setShowBox(!showBox) }}>X</h1>
                    </div>
                    <div className="contenta">

                        <div className="left">
                            <img onClick={() => temp()} src={url + `/images/` + item.image} alt="" className="food-item-image" />
                            <div className="food-item-info">
                                <div className="name">
                                    <p>{item.name}</p>
                                </div>
                                <p className="food-item-desc">{item.description}</p>
                                <p className="food-item-price">${item.price}</p>


                            </div>
                        </div>




                        <div className="right">

                            <div className="user-review">
                                <div className="star-box">
                                    <img className='star-img' src={starImage} alt="" />
                                    <p className="rate">{item?.actRating?.toFixed(1)} out of 5</p>

                                </div>

                                <p className='global'>{item?.nUserRated?.length} global rating</p>

                                {item?.desc?.length > 0 ? (
                                    (() => {
                                        const length = Math.min(item.desc.length, item.title.length);
                                        const elements = [];
                                        for (let i = 0; i < length; i++) {
                                            elements.push(
                                                <div key={i}>

                                                    <div className="user-title">
                                                        <p>{item.title[i]}</p>
                                                    </div>
                                                    <div className="user-desc">
                                                        <p>{item.desc[i]}</p>
                                                    </div>
                                                    <hr></hr>
                                                </div>
                                            );
                                        }
                                        return elements;
                                    })()
                                ) : (
                                    <p>No reviews available.</p>
                                )}
                            </div>
                             {

                                localStorage.getItem('token') && item?.nUserRated?.includes(localStorage.getItem('token')) ? <p className='already'>
                                    you have already reviewed
                                </p> :
                                    !wanaReview ? <>
                                        <button className='btn' onClick={() => { solve() }}>Want to review</button>
                                    </> :
                                        <form className='form' onSubmit={(e) => updateRatings(e)}>
                                            <div className="star">
                                                <p>How would you rate it out of 5 ?</p>
                                                <input type="number" value={rating} placeholder='0' min="0" max="5" onChange={(e) => setRating(e.target.value)} className="rating" required />

                                            </div>
                                            <div className="title">
                                                <p>Title your review</p>
                                                <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" required />
                                            </div>
                                            <div className="description">
                                                <p>Write your review</p>
                                                <textarea onChange={(e) => { setDesc(e.target.value) }} value={desc} type="text" required />
                                            </div>
                                            <button type='submit'>Submit</button>
                                        </form>
                            }




                        </div>
                    </div>



                </div>
            </div>
        </>

    )
}

export default Showbox
