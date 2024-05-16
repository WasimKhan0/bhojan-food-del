import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">

                <div className="footer-content-left">
                    <p>At Tomato, every bite is a symphony of flavor! We're dedicated to sourcing the freshest ingredients and crafting culinary masterpieces that delight your senses. From the first taste to the last, our commitment to quality shines through.</p>
                     <img src={assets.logo} alt='' />
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=''/>
                        <img src={assets.twitter_icon} alt=''/>
                        <img src={assets.linkedin_icon} alt=''/>
                    </div>
                </div>


                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delievery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
