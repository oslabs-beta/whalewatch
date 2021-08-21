import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import container from './containers/container'
import Login from './components/authentication/Login';
import ProtectedRoute from './ProtectedRoute';
import DashboardContainer from './containers/DashboardContainer';
// import navBar from './components/afterLogin/navBar'
// import listOfContainers from './components/afterLogin/listOfContainers';
// import dashBoard from './components/afterLogin/dashBoard';
// import notification from './components/afterLogin/notification';


const App = () => {
  return (
    <>
      <h1>WhaleWatch</h1>
      <Router>
        {/* <navBar /> */}

        {/* Do I still need switch here if using protect Route */}
        <Switch>
          <ProtectedRoute exact path="/" component={DashboardContainer} />
          <Route exact path="/login" component={Login} />
          {/* //     <Route path="/listOfContainers" component={listOfContainers} />
    //     <Route path="/dashBoard" component={dashBoard} />
    //     <Route path="/notification" component={notification} /> */}
        </Switch>


      </Router>
    </>
  );
};



export default App;