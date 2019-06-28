import React from 'react';
import upVote from '../../svgs/upVote';
import downVote from '../../svgs/downVote';
import favorite from '../../svgs/favorite';
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
        <div className="IconContainerBottom">{upVote}</div>
        <div className="IconContainerBottom">{downVote}</div>
        <div className="IconContainerBottom">{favorite}</div>
      </div>
    );
  }
}

export default BottomBar;
