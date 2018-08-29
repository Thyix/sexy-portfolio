import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfilePage from '../../profile/containers/ProfilePage.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route component={() => <ProfilePage />} exact path="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

