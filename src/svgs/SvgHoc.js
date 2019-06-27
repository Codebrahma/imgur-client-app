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

        handleEnter = (e) => {
          if (e.key === 'Enter') {
            this.handleClick();
          }
        }

        render() {
          const { classModifier } = this.props;
          return (
            <span
              className={classModifier ? `svgContainer svgContainer--${classModifier}` : 'svgContainer'}
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
  };

  SuperChargedSvg.defaultProps = {
    conditionalEnable: false,
    classModifier: '',

  };

  return SuperChargedSvg;
};

export default SvgHoc;
