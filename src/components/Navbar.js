import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { AuthContext } from '../context/AuthContext';
import Auth from '../modules/Auth';
import ProfileNavbar from '../modules/ProfileNavbar';
import Button from './Button';
import './navbar.scss';

const Navbar = () => (
  <nav className="nav">
    <Grid>
      <div className="nav--logoButton">
        <Link to="/">
          {logo}
        </Link>
        <AuthContext.Consumer>
          {
            value => (
              value.access_token &&
              <Link to="/upload" className="nav-logoButton--uploadButton">
                <Button color="#33BF96">New post</Button>
              </Link>
            )
          }
        </AuthContext.Consumer>
      </div>
      {/* <SearchModuleORComponent /> will come here. */}

      <AuthContext.Consumer>
        { value => (
          value.access_token ? <ProfileNavbar /> : <Auth />
        )}
      </AuthContext.Consumer>

    </Grid>
  </nav>
);
export default Navbar;
