import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import './SvgHoc.scss';

const SvgHoc = (WrappedComponent) => {
  class SuperChargedSvg extends Component {
        static contextType = AuthContext;
        state = { }

        addClickHandler = () => {
          const { conditionalEnable, handleClick } = this.props;
          const sessionPresent = !!this.context.access_token;

          if (conditionalEnable) {
            if (sessionPresent) { handleClick(); }
          } else {
            handleClick();
          }
        }

        addClassName = () => {
          const { classModifier, classModifiers } = this.props;
          const classes = ['svgContainer'];

          if (classModifier) { classes.push(`svgContainer--${classModifier}`); }
          if (classModifiers.length > 0) { classModifiers.forEach(mod => classes.push(`svgContainer--${mod}`)); }
          return classes.join(' ');
        }

        handleEnter = (e) => {
          if (e.key === 'Enter') {
            this.handleClick();
          }
        }

        render() {
          return (
            <span
              className={this.addClassName()}
              onClick={this.addClickHandler}
              onKeyDown={this.handleEnter}
              role="button"
              tabIndex={0}
            >
              <WrappedComponent />
            </span>
          );
        }
  }
  SuperChargedSvg.propTypes = {
    conditionalEnable: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
    classModifier: PropTypes.string,
    classModifiers: PropTypes.arrayOf(PropTypes.string),
  };

  SuperChargedSvg.defaultProps = {
    conditionalEnable: false,
    classModifier: '',
    classModifiers: [],
  };

  return SuperChargedSvg;
};

export default SvgHoc;
