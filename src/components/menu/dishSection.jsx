import React, { Component } from 'react';
import Dish from './dishItem';
import IconArrow from '../icons/IconArrow';
import './dishSection.css';

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };

    this.clickArrow = this.clickArrow.bind(this);
  }

  clickArrow() {
    const { expanded } = this.state;

    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { section, dishes, onClickDish } = this.props;
    const { expanded } = this.state;

    return (
      <div className="Section">
        <div className="Section-header"
        onClick={this.clickArrow}
        >
          {section + 's'}
          <IconArrow
            width="15"
            height="15"
            expanded={expanded}
            />
        </div>
        {expanded && (
          <div className="Section-body section-scrollbar">
            {dishes.map(dish => (
              <Dish key={dish.uuid} dish={dish} onClickDish={onClickDish} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Section;
