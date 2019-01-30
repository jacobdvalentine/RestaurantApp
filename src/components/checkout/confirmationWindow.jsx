import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';
import './confirmationWindow.css';


class Confirmation extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { handleCloseConfimation } = this.props;

    return (
      <div className="static-modal">
        <Modal.Dialog dialogClassName="ordering-dialog">
          <Modal.Header>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>Your order has been sent</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseConfimation}>Done</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default Confirmation;