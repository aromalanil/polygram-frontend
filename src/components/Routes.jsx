import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from './common/Loader';

const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Question = React.lazy(() => import('./pages/Question'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Settings = React.lazy(() => import('./pages/Settings'));

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/questions/:id">
        <Question />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Suspense>
);
export default Routes;
