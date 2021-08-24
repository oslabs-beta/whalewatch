

const Auth = {
  //make sure to change this
  isAuthenticated: true,
  authenticate() {
    this.isAuthenticated = true;
    //set cookies???
  },
  signout() {
    this.isAuthenticated = false;
  },
  getAuth() {
    return this.isAuthenticated;
  }
}

export default Auth;