import React from 'react';
import PropTypes from 'prop-types';
import { isBuffer } from 'util';


const Button = (props) => {
  const styles = {
    border: '0',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '0.5rem',
    padding: '0.5rem',
    backgroundColor: props.color,
    width: props.width,
  };
  return (
    <button style={styles} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.string,
};

Button.defaultProps = {
  handleClick: () => null,
  color: '#DCDCDC',
  width: null,
};

export default Button;
