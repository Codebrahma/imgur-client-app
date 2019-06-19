import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

const render = Comp => props => <Comp {...props} />;
const Dashboard = render(lazy(() => import("./components/Dashboard")));
const Home = render(lazy(() => import("./components/Home")));
const Auth = render(lazy(() => import("./components/Auth")));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Navbar />

    <main>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </main>

    <Footer />
  </Suspense>
);
export default Routes;
