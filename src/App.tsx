import * as React from "react";
import useAuth from "./useAuth";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

import AppContextProvider from "./AppContextProvider";
import ForgetPassword from "./ForgetPassword";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  const { isLogin, user } = useAuth();
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/"
            render={({ location }) =>
              isLogin ? (
                <Home />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location.pathname }
                  }}
                />
              )
            }
          ></Route>
        </Switch>
      </Router>
      <ForgetPassword />
    </AppContextProvider>
  );
}
