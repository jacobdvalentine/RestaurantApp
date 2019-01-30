import React from 'react';
import capitalize from '../../utils/capitalize';
import './dishItem.css';

const Dish = ({ dish, onClickDish }) => {
  return (
    <div className="Dish" onClick={() => onClickDish(dish)}>
      <div className="Dish-title"> {capitalize(dish.name)} </div>
      <div className="Dish-image" style={{backgroundImage: `url('${dish.image}')`}} src={dish.image} alt={dish.name}></div>
      <button type="button" className="btn">
        Add To Order
      </button>
    </div>
  );
};

export default Dish;
