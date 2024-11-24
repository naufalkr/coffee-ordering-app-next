import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Coffee Shop Logo" />
          <p>
            Welcome to our coffee shop! We offer the finest brews, beans, and
            coffee experiences. Join us for a warm cup and a cozy atmosphere to
            enjoy every sip. From lattes to espresso, we have something for every
            coffee lover!
          </p>
        </div>
        <div className="footer-content-right">
          <h2>OUR COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Our Coffees</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>CONTACT US</h2>
          <ul>
            <li>+1-800-COFFEE</li>
            <li>contact@coffeeshop.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © CoffeeShop.com - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
