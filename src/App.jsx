import React, { Component } from 'react';
import _ from 'underscore';
import DishSection from './components/menu/dishSection';
import DishDetailWindow from './components/menu/dishDetailWindow';
import MenuHeader from './components/menu/menuHeader';
import Greeting from './components/setup/greeting';
import Checkout from './components/checkout/checkoutMenu';
import Confirmation from './components/checkout/confirmationWindow';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      clickedDish: null,
      checkout: false,
      greeting: true,    //greeting screen on open
      confirmation: false,
      user: null,
      groupSize: 1,
      partyMembers: ['Jake', 'Patrick', 'Jason', 'Jacob'],
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleCloseGreeting = this.handleCloseGreeting.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleCloseConfimation = this.handleCloseConfimation.bind(this);
  }

  finishedGreeting() {

    // var partyMembers = [];
    // for (let i = 1; i <= this.state.groupSize; i++) {
    //   partyMembers.push(`Member ${i}`)
    // }
    // this.setState({greeting : false, partyMembers});
    this.setState({greeting : false});

  }

  modifyGroupSize(incremental) {
    
    this.setState({groupSize: Math.max(1, this.state.groupSize + incremental)})
  }

  removeFromCart(dish, uuid) {
    var cart = this.state.cart.slice(0);

    var newCart = _.filter(cart, function(obj) {
      return obj.uuid !== uuid;
    }); 

    this.setState({
      cart: newCart,
      checkout: (newCart.length <= 0) ? false : true,
    });
  }
  onClickDish(dish) {
    this.setState({
      clickedDish: dish,
    });
  }

  onCheckoutClick() {
    this.setState({
      checkout: true,
    });
  }

  handleClose() {
    this.setState({
      clickedDish: null,
      checkout: false,
    });
  }

  handleCloseGreeting() {
    this.setState({
      user: "bob",                 
      greeting: false,
      
    });
  }
  handleCloseConfimation() {
    this.setState({                
      confirmation: false, 
    });
  }

  handleOrder(optionChoices, splitPeople) {
    const { cart, clickedDish } = this.state;

    this.setState({
      clickedDish: null,
      cart: cart.concat({
        dish: clickedDish,
        optionChoices,
        splitPeople,
        uuid: uuid()
      }),
    });
  }

  handleCheckout() {
    this.setState({
      cart: [],
      checkout: false,
      confirmation: true
    });
  }

  render() {
    const { dishes } = this.props;
    const {
      cart,
      clickedDish,
      checkout,
      partyMembers,
      greeting,
      confirmation
    } = this.state;
    
    const sections = new Set(dishes.map(dish => dish.category));

    if (greeting) {
      return (
        <Greeting 
          groupSize={this.state.groupSize} 
          modifyGroupSize={this.modifyGroupSize.bind(this)}
          finishedGreeting={this.finishedGreeting.bind(this)}/>
      )
    }

    return (
      <div className="App">
        <div className="App-container">
          <MenuHeader
            cart={cart}
            onCheckoutClick={this.onCheckoutClick.bind(this)}
          />
          {[...sections].map(section => (
            <DishSection
              key={uuid()}
              section={section}
              dishes={dishes.filter(dish => dish.category === section)}
              onClickDish={this.onClickDish.bind(this)}
            />
          ))}
        </div>
        {clickedDish ? (
          <DishDetailWindow
            dish={clickedDish}
            handleClose={this.handleClose}
            handleOrder={this.handleOrder}
            partyMembers={partyMembers}
          />
        ) : null}
        {checkout ? (
          <Checkout
            cart={cart}
            handleClose={this.handleClose}
            handleCheckout={this.handleCheckout}
            removeFromCart={this.removeFromCart}
          />
        ) : (
          false
        )}
        {confirmation ? (
          <Confirmation
          handleCloseConfimation={this.handleCloseConfimation}
          />
        ) : (
          false
        )}
      </div>
    );
  }
}

export default App;
