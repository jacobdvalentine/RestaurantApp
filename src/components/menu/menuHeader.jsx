import React from 'react';
import './menuHeader.css';

const Header = ({ cart, onCheckoutClick }) => {

  var display = cart.length > 0 ? (
    <React.Fragment>
      <div className="Header box-shadow center-block">
        <div className="header-div">
          <button
            type="button"
            class=""
            onClick={onCheckoutClick}
          >
            Checkout: {cart.length}
          </button>
          </div>
        </div>
    </React.Fragment>
  )
    : (<div></div>);

  return display;
      
};

export default Header;
