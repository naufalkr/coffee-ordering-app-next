import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favorite Coffee Here</h2>
        <p>
          Explore a variety of coffee blends, freshly brewed to perfection. Start your day with the perfect cup!
        </p>
        <button>View Coffee Menu</button>
      </div>
    </div>
  );
};

export default Header;
