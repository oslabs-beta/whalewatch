import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/authentication/Login';
import DashboardContainer from './containers/DashboardContainer';
import ContainersContainer from './containers/ContainersContainer';
import NotificationsContainer from './containers/NotificationsContainer';

const App = () => {
  return (
    <>
      <h1>WhaleWatch</h1>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/containers" component={ContainersContainer} />
          <Route path="/notification" component={NotificationsContainer} />
        </Switch>
      </Router>
    </>
  );
};



export default App;