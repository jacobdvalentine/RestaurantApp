import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Background from "./checkoutBackground.jsx";
import _ from 'underscore';
import './checkoutMenu.css';
import IconCross from '../icons/IconCross';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeItemCheckout(dish, optionChoices, splitPeopleObject, uuid) {
    const removeFromCart = this.props.removeFromCart;
    const splitPeople = Object.entries(splitPeopleObject)
      .filter((([key, value]) => value))
      .map((([key, value]) => key));

    return (
      <div className="row checkout-row">
        <div className="col-4">
          <div
            className="checkout-item-image"
            src={dish.image}
            style={{backgroundImage: `url('${dish.image}')`}}
            alt="Food Image"
          >
          </div>
        </div>
        <div className="col-8">
          <div className="checkout-item-title">{dish.name}
            <button className="checkout-exitButton" onClick={() => removeFromCart(dish, uuid)}>
              <IconCross/>
            </button>
          </div>
          <div>
            {
              Object.entries(optionChoices).map(([name, choice]) => {
                if (choice === true) {
                  return (
                    <div>{name}</div>
                  );
                }
                if (choice === false) {
                  return null;
                }
                return (
                  <div>
                    <span>{`${name}: ${choice}`}</span>
                  </div>
                );
              })
            }
          </div>
          {
            splitPeople.length ? (
              <div>Split with: {splitPeople.map(splitPerson => (<div>{splitPerson}, </div>))}</div>
            ) : null
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      cart,
      handleClose,
      handleCheckout,
    } = this.props;

    const totalPrice = cart.reduce((total, { dish, splitPeople }) => {
      const numSplit = Object.entries(splitPeople)
        .filter((([key, value]) => value))
        .map((([key, value]) => key))
        .length;
      return total + (dish.price / (numSplit || 1));
    }, 0);

    return (
      <div>
        <Background onClick={handleClose}/>
        <div className="static-modal">
          <Modal.Dialog dialogClassName="checkout-dialog" style={{backgroundColor: "rgba(0,0,0,0)"}}>
            {/* Header */}
            <Modal.Header>
              <Modal.Title>Checkout</Modal.Title>
              <div className="price-display">
                Total Price: <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </Modal.Header>
            {/* Body */}
            <Modal.Body style={{backgroundColor: "rgba(0,0,0,0)"}}>
              {
                _.map(cart, ({ dish, optionChoices, splitPeople, uuid}) => {
                  return this.makeItemCheckout(dish, optionChoices, splitPeople, uuid)
                })
              }
            </Modal.Body>
            {/* Footer */}
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
              <Button bsStyle="warning" onClick={handleCheckout}>
                Place Order
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    );
  }
}

export default Checkout;
