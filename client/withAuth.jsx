import Auth from "./Auth";
export const withAuth = (Component) => {
  return () => {
    // Check if Authenticated
    const user = Auth.getAuth();

    // If Logged in, it will render the Component.
    if (user) {
      return <Component user={user} />;
    } else {
      return <LoginComponent />
    }
  };
};