import React from 'react';
import classNames from 'classnames';
import './IconArrow.css';

const IconArrow = ({ onClick, expanded, width, height }) => (
  <svg
    className={classNames('icon-arrow', expanded ? 'Section__icon-arrow Section__icon-arrow--expanded' : 'Section__icon-arrow')}
    xmlns="http://www.w3.org/2000/svg"
    width={width || 10}
    height={height || 10}
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
  </svg>
);

export default IconArrow;
