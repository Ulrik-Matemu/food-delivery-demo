import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Craving something delicious? You’re in the right place! Explore our wide variety of freshly prepared meals, from local favorites to international delights, all available at your fingertips.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Derivery</li>
                        <li>Privacy police</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li><a href="tel:+255742295164">+255-742-295-164</a></li>
                        <li><a href="nominee427@gmail.com">nominee427@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">© 2025 Tomato. All rights reserved. Tomato and its logo are trademarks of the company.</p>
        </div>
    )
}

export default Footer
