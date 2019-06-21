import React from 'react';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { AuthContext } from '../context/AuthContext';
import Auth from '../modules/Auth';
import ProfileNavbar from '../modules/ProfileNavbar';

const Navbar = () => (
  <nav>
    <Grid>
      <a href="/">
        {logo}
      </a>

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
