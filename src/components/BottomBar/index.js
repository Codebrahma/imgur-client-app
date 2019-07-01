import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './bottomBar.scss';

class BottomBar extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <div className="bottomWrapper">
        {/* <div className="IconContainerBottom">{upVote}</div> */}
        <FontAwesomeIcon icon="arrow-alt-circle-up" />
        <FontAwesomeIcon icon="arrow-alt-circle-down" />
        <FontAwesomeIcon icon="heart" />
      </div>
    );
  }
}

export default BottomBar;
