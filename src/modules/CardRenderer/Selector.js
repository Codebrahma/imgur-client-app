import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideOption);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideOption);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutsideOption = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showOptions: false });
    }
  };

  toggleOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions,
    }));
  }

  selectOption = (option) => {
    const { handleClick } = this.props;
    this.toggleOptions();
    handleClick(option);
  }

  handleEnter = (e, callback) => {
    if (e.key === 'Enter') {
      callback(e);
    }
  }

  render() {
    const { options, currentOption } = this.props;
    return (
      <div className="selector" ref={this.setWrapperRef}>
        <div
          className="selector__header"
          onClick={this.toggleOptions}
          role="button"
          onKeyDown={e => this.handleEnter(e, this.toggleOptions)}
          tabIndex={0}
        >
          <span>{currentOption}</span>
          <FontAwesomeIcon icon="caret-down" />
        </div>
        { this.state.showOptions &&
          <React.Fragment>
            <div className="selector__triangle" />
            <div className="selector__options">
              {options.map(option => (
                <div
                  className={currentOption === option ? 'active' : ''}
                  onClick={() => this.selectOption(option)}
                  role="button"
                  onKeyDown={e => this.handleEnter(e, () => this.selectOption(option))}
                  tabIndex={0}
                  key={option}
                >
                  {option}
                </div>
              ))}
            </div>
          </React.Fragment>
        }
      </div>

    );
  }
}

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentOption: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Selector;
