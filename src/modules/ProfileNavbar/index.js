import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import { fetchUserDetails } from '../../api';
import { history } from '../../routerPropTypes';
import Button from '../../components/Button';
import './ProfileNavbar.scss';

class ProfileNavbar extends Component {
    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.state = {
        avatar: null,
      };
    }

    componentDidMount() {
      const { account_username: username } = this.context;
      fetchUserDetails(username).then((res) => {
        this.setState({
          avatar: res.data.data.avatar,
        });
      });
    }

    render() {
      const { account_username: username, logOut } = this.context;
      return (
        <div className="profileNavbar flexCenterAlign">
          <Link to={`/user/${username}/about`} className="profileNavbar__avatarContainer">
            {this.state.avatar ?
              <img src={this.state.avatar} alt="profile" className="profileImage" />
            : null}
          </Link>
          {/* <span className="profileNavbar__username">{username}</span> */}
          <Button handleClick={() => {
            logOut();
            this.props.history.push('/');
          }}
          >Logout
          </Button>
        </div>
      );
    }
}

ProfileNavbar.propTypes = {
  history: history.isRequired,
};


export default withRouter(ProfileNavbar);
