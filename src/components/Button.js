import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  border: '0',
  borderRadius: '8px',
  cursor: 'pointer',
  margin: '0.5rem',
  padding: '0.5rem',
};

const Button = props => (
  <button style={styles} onClick={props.handleClick}>
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  handleClick: () => null,
};

export default Button;
