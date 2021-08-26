import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/authentication/Login';
import DashboardContainer from './containers/DashboardContainer';
import ContainersContainer from './containers/ContainersContainer';
import NotificationsContainer from './containers/NotificationsContainer';
import SettingsContainer from './containers/SettingsContainer';
import NavBar from './components/NavBar/NavBar';

// import listOfContainers from './components/afterLogin/listOfContainers';
// import dashBoard from './components/afterLogin/dashBoard';
// import notification from './components/afterLogin/notification';
import Form from './components/authentication/form'
import './styles.scss';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/nav" component={NavBar} />
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Form} />
          <Route exact path="/containers" component={ContainersContainer} />
          <Route exact path="/settings" component={SettingsContainer} />
          <Route path="/notification" component={NotificationsContainer} />
        </Switch>
      </Router>
    </>
  );
};

export default App;