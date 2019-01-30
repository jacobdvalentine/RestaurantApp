import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './greeting.css';
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";

const Background = () => {
  return ReactDOM.createPortal(
   <div className="greeting-background"></div>,
    document.body
  );
}

class Greeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Background/>
      <div className="greeting-window">
        <div className="greeting-title">What is your name?</div>
        {/* <div className="greeting-info">{this.props.groupSize} Guests</div> */}
        <div className="greeting-form">
          <input type="text" class="form-control"></input>
          {/* <button onClick={() => this.props.modifyGroupSize(-1)} class="greeting-intButton btn btn-default"><IconMinus/></button>
          <button onClick={() => this.props.modifyGroupSize(1)} class="greeting-intButton btn btn-default"><IconPlus/></button> */}
        </div>
        <button onClick={() => this.props.finishedGreeting()} class="btn btn-primary greeting-finishedButton">Continue</button>
      </div>
      </div>
  )
  }

}
export default Greeting;
