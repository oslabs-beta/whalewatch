// class Auth {
//   constructor() {
//     this.authenticated = false;
//   }

//   login(cb) {
//     this.authenticated = true;
//     cb();
//   }

//   logout(cb) {
//     this.authenticated = false;
//     cb();
//   }

//   isAuthenticated() {
//     return this.authenticated;
//   }
// }

// export default new Auth();

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


