

const Auth = {
  isAuthenticated: false,
  authenticate() {
    //figure out authentication here
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  },
  getAuth() {
    return this.isAuthenticated;
  }
}

export default Auth;