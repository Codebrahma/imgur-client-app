import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./modules/Home'));
const AuthCallback = lazy(() => import('./modules/Auth/AuthCallback'));
const Dashboard = lazy(() => import('./modules/Dashboard'));
const User = lazy(() => import('./modules/User'));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <AuthContextProvider>

      <Navbar />
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/auth_cb" component={AuthCallback} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/user/:username" component={User} />
          </Switch>
        </Router>
      </main>
      <Footer />

    </AuthContextProvider>
  </Suspense>
);
export default Routes;
