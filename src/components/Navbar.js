import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';
import './Navbar.scss';

class Navbar extends Component {
  static contextType = AuthContext;
  state = { }

  startAuthorization = () => {
    const authorizationUrl = `https://api.imgur.com/oauth2/authorize?client_id=${
      process.env.CLIENT_ID
    }&response_type=token`;

    window.location.href = authorizationUrl;
  };

  render() {
    const { account_username: username, logOut, access_token: accessToken } = this.context;
    console.log(localStorage.getItem('data'));
    return (
      <nav>
        <Grid>
          <a href="/">
            {logo}
          </a>

          { accessToken ?
            (
              <div className="flexCenterAlign">
                <img className="profileImage" src={JSON.parse(localStorage.getItem('data')).avatar} alt="DB" />
                <span>{username}</span>
                <Button handleClick={logOut}>Logout</Button>
              </div>
            ) : (
              <Button handleClick={this.startAuthorization}>Connect with Imgur</Button>
            )
          }
        </Grid>
      </nav>
    );
  }
}

export default Navbar;
// const Navbar = () => (
//   <nav>
//     <Grid>
//       <a href="/">
//         {logo}
//       </a>

//       <AuthContext.Consumer>
//         { value => (
//           value.access_token ? <ProfileNavbar /> : <Auth />
//         )}
//       </AuthContext.Consumer>

//     </Grid>
//   </nav>
// );

// export default Navbar;
