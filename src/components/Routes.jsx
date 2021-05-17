import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from './common/Loader';

const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));

const Routes = () => (
  <Switch>
    <Suspense fallback={<Loader />}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
    </Suspense>
  </Switch>
);
export default Routes;
