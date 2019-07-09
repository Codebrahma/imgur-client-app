import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './bottomBar.scss';
import { AuthContext } from '../../context/AuthContext';
import { favoriteAlbumApi } from '../../api';

class BottomBar extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      itemFavouriteState: false,
    };
  }
  handleFavourite = (e) => {
    e.preventDefault();
    const { access_token: accessToken } = this.context;
    if (!accessToken) return;
    const { albumId } = this.props;
    favoriteAlbumApi(albumId).then((res) => {
      const { data } = res.data;
      if (data === 'favorited') {
        this.setState({ itemFavouriteState: true });
      } else this.setState({ itemFavouriteState: false });
    })
      .catch(err => console.log(err));
  };
  render() {
    const { itemFavouriteState } = this.state;
    return (
      <div className="bottomWrapper">
        <FontAwesomeIcon icon="arrow-alt-circle-up" />
        <FontAwesomeIcon icon="arrow-alt-circle-down" />
        <FontAwesomeIcon
          onClick={this.handleFavourite}
          icon="heart"
          className={itemFavouriteState ? 'favourite' : ''}
        />
      </div>
    );
  }
}
BottomBar.propTypes = {
  albumId: PropTypes.string.isRequired,
};

export default BottomBar;
