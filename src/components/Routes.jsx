import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from './common/Loader';

const Home = React.lazy(() => import('./pages/Home'));
const Topic = React.lazy(() => import('./pages/Topic'));
const Search = React.lazy(() => import('./pages/Search'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Question = React.lazy(() => import('./pages/Question'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Notification = React.lazy(() => import('./pages/Notification'));

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/u/:username">
        <Profile />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/notification">
        <Notification />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/questions/:id">
        <Question />
      </Route>
      <Route exact path="/topics/:name">
        <Topic />
      </Route>
      <Route path="/404">
        <NotFound />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Suspense>
);
export default Routes;
