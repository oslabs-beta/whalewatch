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
import Form from './components/authentication/form'
import './styles.scss';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const [userId, setUserId] = useState('');
  const [auth, setAuth] = useState(false); 

  return ( 
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route exact path="/nav" component={NavBar} />
            <ProtectedRoute exact path="/dashboard" component={DashboardContainer}/>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/signup"><Form /></Route>
            <Route exact path="/containers" component = {ContainersContainer}/> 
            <ProtectedRoute exact path="/settings" component={SettingsContainer}/>
            <ProtectedRoute path="/notification" component={NotificationsContainer}/>
            //if user tries to go to any other path that isn't defined
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </DndProvider>
  );
};

export default App;