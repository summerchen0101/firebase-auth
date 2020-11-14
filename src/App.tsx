import * as React from "react";
import useAuth from "./useAuth";
import Login from "./Login";
import Home from "./Home";

export default function App() {
  const { isLogin, user } = useAuth();
  return <div>{isLogin ? <Home /> : <Login />}</div>;
}
