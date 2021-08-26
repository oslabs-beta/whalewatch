
const Auth = {
  //make sure to change this
  //initially not authenticated
  isAuthenticated: false,
  login(cb) {
    this.isAuthenticated = true;
    //simulate async operation. go back to server and when done, will call back to caller
    cb();
    //set cookies???
    //cb() ?????
  },
  signout(cb) {
    this.isAuthenticated = false;
    cb();
  },
  //determines whether authentication is
  getAuth() {
    return this.isAuthenticated;
  }
}

export default Auth;


