import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { useAppContext } from "./AppContextProvider";
import useAuth from "./useAuth";
import LoadingHelper from "./LoadingHelper";
import { useLocation, useHistory, Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useAppContext();
  const location = useLocation<{ from: string }>();
  const history = useHistory();
  const { login, loginWithGoogle } = useAuth();
  const handleForget = () => context?.setIsPwPopupVisible(true);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
      history.push(location.state?.from ?? "/");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const loadingBtn = (
    <Button variant="primary">
      登入
      <span className="mr-2"></span>
      <LoadingHelper />
    </Button>
  );
  const onGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="container" {...props}>
      <div>
        <Link to="/register">{"> 註冊"}</Link>
        <Card style={{ width: "350px", padding: "15px" }}>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="請輸入Email"
                onBlur={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="請輸入密碼"
                onBlur={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {isLoading ? (
              loadingBtn
            ) : (
              <Button variant="primary" type="submit">
                登入
              </Button>
            )}

            <span className="mr-2"></span>
            <Button onClick={handleForget}>忘記密碼</Button>
            <span className="mr-2"></span>
            <Button onClick={onGoogleLogin} variant="danger">
              Google 登入
            </Button>
            <span className="mr-2"></span>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default styled(Login)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
