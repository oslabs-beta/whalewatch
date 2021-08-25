const Auth = {
  //make sure to change this
  //initially not authenticated
  isAuthenticated: true,
  authenticate() {
    this.isAuthenticated = true;
    //set cookies???
    //cb() ?????
  },
  signout() {
    this.isAuthenticated = false;
  },
  //determines authentication
  getAuth() {
    return this.isAuthenticated;
  }
}

export default Auth;