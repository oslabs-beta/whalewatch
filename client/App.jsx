import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/authentication/Login';
import DashboardContainer from './containers/DashboardContainer';
import ContainersContainer from './containers/ContainersContainer';
import NotificationsContainer from './containers/NotificationsContainer';
import SettingsContainer from './containers/SettingsContainer';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './ProtectedRoute.jsx';
import Auth from './Auth.js';
import Form from './components/authentication/form'
import './styles.scss';

////for drag and drop 
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const [userId, setUserId] = useState('');
  if (!Auth.isAuthenticated) {
    Auth.isAuthenticated = true;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Switch>
          <Route exact path="/"><Login setUserId={setUserId} /></Route>
          <Route exact path="/nav" component={NavBar} />
          <Route exact path="/dashboard"><DashboardContainer userId={userId} /> </Route>
          <Route exact path="/login"><Login setUserId={setUserId} /></Route>
          <Route exact path="/signup"><Form setUserId={setUserId} /></Route>
          <Route exact path="/containers"><ContainersContainer userId={userId} /> </Route>
          <Route exact path="/settings"><SettingsContainer userId={userId} /> </Route>
          <Route path="/notification"><NotificationsContainer userId={userId} /> </Route>
          //if user tries to go to any other path that isn't defined
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </DndProvider>
  );
};

export default App;