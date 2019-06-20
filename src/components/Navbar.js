import React from 'react';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { Auth } from '../modules';
import { AuthContext } from '../context/AuthContext';
import ProfileNavbar from './ProfileNavbar';

const Navbar = () => (
  <nav>
    <Grid>
      <a href="/">
        {logo}
      </a>

      <AuthContext.Consumer>
        { value => (
          value.access_token ? <ProfileNavbar /> : <Auth />
        )}
      </AuthContext.Consumer>

    </Grid>
  </nav>
);
export default Navbar;
