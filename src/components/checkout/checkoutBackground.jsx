import React from 'react';
import ReactDOM from 'react-dom';
import "./checkoutMenu.css";

const Background = () => {
     return ReactDOM.createPortal(
      <div className="checkout-backgroundBlur"></div>,
       document.body
     );
}

export default Background;