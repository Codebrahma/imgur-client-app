import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { AuthContext } from '../context/AuthContext';
import Auth from '../modules/Auth';
import ProfileNavbar from '../modules/ProfileNavbar';

const Navbar = () => (
  <nav className="nav">
    <Grid>
      <Link to="/">
        {logo}
      </Link>

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
