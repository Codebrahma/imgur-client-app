import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      account_username: localStorage.getItem('account_username'),
      votedAlbum: {},
    };
  }

    logOut = () => {
      // HELP: How to clear the entire state.
      this.setState({
        access_token: null,
        refresh_token: null,
        account_username: null,
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
      this.setState(data);
    };

    markAlbumAsVoted = (id, type) => {
      const { votedAlbum } = this.state;
      const tempVotedAlbum = { ...votedAlbum };
      if (type === 'veto') {
        delete tempVotedAlbum[id];
      } else {
        tempVotedAlbum[id] = type;
      }

      this.setState({
        votedAlbum: tempVotedAlbum,
      });
    }

    render() {
      return (
        <AuthContext.Provider value={Object.assign({}, this.state, {
          extractParamsAndSaveToLocalStorageAndState: this.extractParamsAndSaveToLocalStorageAndState,
          markAlbumAsVoted: this.markAlbumAsVoted,
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
