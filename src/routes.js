import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./modules/Home'));
const AuthCallback = lazy(() => import('./modules/Auth/AuthCallback'));
const Dashboard = lazy(() => import('./modules/Dashboard'));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <AuthContextProvider>

      <Navbar />
      <main>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/auth_cb" component={AuthCallback} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </main>
      <Footer />

    </AuthContextProvider>
  </Suspense>
);
export default Routes;
