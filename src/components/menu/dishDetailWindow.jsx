import React, { Component } from 'react';
import capitalize from '../../utils/capitalize';
import {
  Button,
  ControlLabel,
  Modal,
  Radio,
  FormControl,
  FormGroup,
  Checkbox,
} from 'react-bootstrap';
import IconFire from '../icons/IconFire';
import IconThumb from '../icons/IconThumb';
import './dishDetailWindow.css';
import Background from "../checkout/checkoutBackground.jsx";

class OrderingScreen extends Component {
  constructor(props) {
    super(props);

    const {
      dish: { options },
      partyMembers,
    } = props;

    const optionChoices = {};
    options.forEach(option => {
      const { name, default: defaultOption } = option;
      optionChoices[name] = defaultOption;
    });

    const splitPeople = {};
    partyMembers.forEach(partyMember => {
      splitPeople[partyMember] = false;
    });

    this.state = {
      optionChoices,
      isSplit: false,
      splitPeople, 
    };
  }

  handleChoiceChange(name, choice) {
    const { optionChoices } = this.state;
    this.setState({
      optionChoices: {
        ...optionChoices,
        [name]: choice,
      },
    });
  }

  handleStringChange(name, event) {
    const { optionChoices } = this.state;
    this.setState({
      optionChoices: {
        ...optionChoices,
        [name]: event.target.value,
      },
    });
  }

  handleBoolChange(name) {
    const { optionChoices } = this.state;
    const { [name]: currentValue } = optionChoices;
    this.setState({
      optionChoices: {
        ...optionChoices,
        [name]: !currentValue,
      },
    });
  }

  makeOption(option) {
    const {
      optionChoices: { [option.name]: currentValue },
    } = this.state;
    if (option.type === 'choice') {
      return (option.choices || []).map(choice => (
        <Radio
          readOnly
          checked={choice === currentValue}
          onChange={event => this.handleChoiceChange(option.name, choice)}
        >
          {choice}
        </Radio>
      ));
    } else if (option.type === 'string') {
      return (
        <FormControl
          type="text"
          value={currentValue}
          placeholder={currentValue}
          onChange={event => this.handleStringChange(option.name, event)}
        />
      );
    } else if (option.type === 'bool') {
      return (
        <Checkbox
          readOnly
          checked={currentValue}
          onChange={event => this.handleBoolChange(option.name)}
        >
          {option.name}
        </Checkbox>
      );
    } else {
      throw new Error(`Unknown option type ${option.type}`);
    }
  }

  makeTag(tag) {
    if (tag === 'popular') {
      return (
        <div>
        Popular
        <IconFire width="15" height="15" />
      </div>
      );
    } else if (tag === 'recommended') {
      return (
        <div>
          Recommended
          <IconThumb width="15" height="15" />
        </div>
      );
    } else {
      throw new Error(`Unknown tag ${tag}`);
    }
  }

  splitWithPerson(partyMember) {
    const { splitPeople } = this.state;
    const { [partyMember]: isPersonSplit } = splitPeople;
    this.setState({
      splitPeople: {
        ...splitPeople,
        [partyMember]: !isPersonSplit,
      },
    });
  }

  makeSplit() {
    const { dish, partyMembers } = this.props;
    const { splitPeople } = this.state;

    const numSplitPeople = Object.values(splitPeople)
      .filter(isIncluded => isIncluded)
      .length; // + 1;
    const pricePerPerson = dish.price / numSplitPeople;

    return (
      <React.Fragment>
        {
          partyMembers.map(partyMember => (
            <Checkbox
              readOnly
              checked={splitPeople[partyMember]}
              className="OrderingScreen-split-person"
              onChange={event => this.splitWithPerson(partyMember)}
            >
              <span>{partyMember}</span>
              {
                splitPeople[partyMember] ?
                  <span> - ${pricePerPerson.toFixed(2)}</span>
                  : null
              }
            </Checkbox>
          ))
        }
      </React.Fragment>
    );
  }

  render() {
    const { dish, handleClose, handleOrder } = this.props;
    const { isSplit, optionChoices, splitPeople } = this.state;

    return (
      <div>
      <Background onClick={handleClose}/>
      <div className="static-modal">
        <Modal.Dialog dialogClassName="ordering-dialog">
          <Modal.Header>
            <Modal.Title>{capitalize(dish.name)}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-4">
                <img
                  className="ordering-image"
                  src={dish.image}
                  alt={dish.name}
                />
              </div>
              <div className="col-8">
                {dish.description || 'Description'}
                <div>${dish.price.toFixed(2)}</div>
                <div>{dish.tags.map(tag => this.makeTag(tag))}</div>
              </div>
            </div>
            <form>
              {(dish.options || []).map(option => (
                <div className="ordering-option">
                <FormGroup>
                  <ControlLabel>{option.name}</ControlLabel>
                  {this.makeOption(option)}
                </FormGroup>
                </div>
              ))}
              <Checkbox
                readOnly
                checked={isSplit}
                onChange={event => this.setState({ isSplit: !isSplit })}
              >
                Split Order
              </Checkbox>
              {isSplit ? this.makeSplit() : null}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              Close
            </Button>
            <Button bsStyle="warning" onClick={() => handleOrder(optionChoices, splitPeople)}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      </div>
    );
  }
}

export default OrderingScreen;
