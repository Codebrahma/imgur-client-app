import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const render = Comp => props => <Comp {...props} />;
const Home = render(lazy(() => import('./modules/Home')));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Navbar />

    <main>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </main>

    <Footer />
  </Suspense>
);
export default Routes;
