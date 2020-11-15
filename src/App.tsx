import * as React from "react";
import useAuth from "./useAuth";
import Login from "./Login";
import Home from "./Home";
import AppContextProvider from "./AppContextProvider";
import ForgetPassword from "./ForgetPassword";

export default function App() {
  const { isLogin, user } = useAuth();
  return (
    <AppContextProvider>
      <div>{isLogin ? <Home /> : <Login />}</div>
      <ForgetPassword />
    </AppContextProvider>
  );
}
