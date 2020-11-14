import * as React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { auth } from "./firebase";
import useAuth from "./useAuth";

export default function Home() {
  const { user, logout, sendVerification } = useAuth();
  const onLogout = () => logout();
  return (
    <div className="container">
      {user?.email}
      <br />
      <Button onClick={onLogout}>Logout</Button>
      {!user?.emailVerified && (
        <Button onClick={sendVerification}>發驗證信</Button>
      )}
    </div>
  );
}
