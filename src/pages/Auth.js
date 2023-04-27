import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        setUser({  });
      } else {
        setUser(null);
      }
    }, 100);
  }, []);

  if (user === undefined) {
    return null;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;


