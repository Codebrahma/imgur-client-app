import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import AuthContextProvider from './context/AuthContext';
// import { location } from './routerPropTypes';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
// import User from './modules/User';
// import Dashboard from './modules/Dashboard';
// import AuthCallback from './modules/Auth/AuthCallback';

const Home = lazy(() => import('./modules/Home'));
const AuthCallback = lazy(() => import('./modules/Auth/AuthCallback'));
const Dashboard = lazy(() => import('./modules/Dashboard'));
const User = lazy(() => import('./modules/User'));
const Album = lazy(() => import('./modules/Album'));
const FileUploader = lazy(() => import('./components/FileUploader'));
// const User = lazy(() => import('./modules/User'));

// https://reacttraining.com/react-router/web/example/auth-workflow
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//     (localStorage.getItem('access_token') ? (
//       <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//           pathname: '/login',
//           state: { from: props.location },
//         }}
//         />
//         ))
//       }
//   />
// );

// PrivateRoute.propTypes = {
//   location: location.isRequired,
//   component: PropTypes.node.isRequired,
// };
// const Private = () => <h1>Private</h1>;

const Routes = () => (
  <Suspense fallback={
    <div>
      <Loader fullScreen />
    </div>}
  >
    <AuthContextProvider>

      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              path="/login"
              render={() => {
                const authorizationUrl = `https://api.imgur.com/oauth2/authorize?client_id=${
                  process.env.CLIENT_ID
                }&response_type=token`;

                  window.location.href = authorizationUrl;
                  return 'FULL BLANK PAGE';
              }}
            />

            <Route path="/auth_cb" component={AuthCallback} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/upload" component={FileUploader} />
            <Redirect exact from="/user/:username" to="/user/:username/about" />
            <Route path="/user/:username" component={User} />
            <Route path="/gallery/:galleryHash" component={Album} />
            {/* Route path="/user/:username" component={User} /> */}
            {/* <PrivateRoute path="/private" component={Private} /> */}
          </Switch>
        </main>
        <Footer />
      </Router>

    </AuthContextProvider>
  </Suspense>
);
export default Routes;
