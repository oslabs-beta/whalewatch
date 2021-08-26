import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/authentication/Login';
import DashboardContainer from './containers/DashboardContainer';
import ContainersContainer from './containers/ContainersContainer';
import NotificationsContainer from './containers/NotificationsContainer';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './ProtectedRoute.jsx';
import Auth from './Auth.js';
// import listOfContainers from './components/afterLogin/listOfContainers';
// import dashBoard from './components/afterLogin/dashBoard';
// import notification from './components/afterLogin/notification';
import Form from './components/authentication/form'
import './styles.scss';

const App = () => {

  if(!Auth.isAuthenticated){
    Auth.isAuthenticated = true;
  }
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
          <Route path="/notification" component={NotificationsContainer} />
          //if user tries to go to any other path that isn't defined
          <Route path = "*" component = { () => "404 NOT FOUND"}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;