import * as React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAppContext } from "./AppContextProvider";
import { auth } from "./firebase";
import useAuth from "./useAuth";

export default function Home() {
  const { user, logout, sendVerification } = useAuth();
  const onLogout = () => {
    logout();
  };
  if (user) {
    return (
      <div className="container">
        <div className="mt-2"></div>
        <Button onClick={onLogout}>登出</Button>
        <div className="mt-2"></div>
        {user.email}
        <span className="mr-2"></span>
        {!user.emailVerified && (
          <Button variant="danger" size="sm" onClick={sendVerification}>
            發驗證信
          </Button>
        )}
      </div>
    );
  }
  return <></>;
}
