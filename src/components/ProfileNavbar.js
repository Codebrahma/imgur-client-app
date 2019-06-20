import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';

class ProfileNavbar extends Component {
    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { account_username: username, logOut } = this.context;
      return (
        <div className="flexCenterAlign">
          <span>Hi, {username}</span>
          <Button handleClick={logOut}>Logout</Button>
        </div>
      );
    }
}

export default ProfileNavbar;
