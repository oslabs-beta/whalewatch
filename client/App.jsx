import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import container from './containers/container'
import authentication from './components/authentication/authentication';
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
          {/* //     <ProtectedRoute exact={true} path="/"> <container /> </ProtectedRoute> */}
          <Route path="/authentication" component={authentication} />
          {/* //     <Route path="/listOfContainers" component={listOfContainers} />
    //     <Route path="/dashBoard" component={dashBoard} />
    //     <Route path="/notification" component={notification} /> */}
        </Switch>


      </Router>
    </>
  );
};



export default App;