import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const render = Comp => props => <Comp {...props} />;
const Home = render(lazy(() => import('./modules/Home')));
const AuthCallback = render(lazy(() => import('./modules/Auth/AuthCallback')));
const Dashboard = render(lazy(() => import('./modules/Dashboard')));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
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
  </Suspense>
);
export default Routes;
