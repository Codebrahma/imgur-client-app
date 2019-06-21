import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = React.createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      account_username: localStorage.getItem('account_username'),
    };
  }

    logOut = () => {
      this.setState({
        access_token: null,
      });
      localStorage.clear();
    }

    extractParamsAndSaveToLocalStorageAndState = (hash) => {
      const destructed = hash.split(/&|=/g);
      localStorage.setItem(destructed[0].slice(1), destructed[1]);
      const data = {
        [destructed[0].slice(1)]: destructed[1],
      };
      for (let i = 2; i < destructed.length; i += 2) {
        localStorage.setItem(destructed[i], destructed[i + 1]);
        data[destructed[i]] = destructed[i + 1];
      }
      axios({
        method: 'get',
        url: `https://api.imgur.com/3/account/${data.account_username}`,
        headers: { Authorization: `Client-ID ${process.env.CLIENT_ID}` },
      }).then((res) => {
        localStorage.setItem('data', JSON.stringify(res.data.data));
        this.setState(data);
      });
      return <h1>Hello </h1>;
    };

    render() {
      return (
        <AuthContext.Provider value={Object.assign({}, this.state, {
          extractParamsAndSaveToLocalStorageAndState: this.extractParamsAndSaveToLocalStorageAndState,
          logOut: this.logOut,
        })}
        >
          {this.props.children}
        </AuthContext.Provider>
      );
    }
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
