import { ReactElement } from "react";
import { useAuthSession } from "../context/AuthSessionProvider";
import { Navigate } from "react-router-dom";

type PrivateProps = {
  component: ReactElement;
};

export const PrivateRoute = ({ component }: PrivateProps) => {
  const { session, loading } = useAuthSession();
  if (loading) {
    <p> Authenticating ...</p>;
  }
  return session ? component : <Navigate to="/auth" />;
};
