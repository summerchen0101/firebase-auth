import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { useAppContext } from "./AppContextProvider";
import useAuth from "./useAuth";
import LoadingHelper from "./LoadingHelper";
import { Link, useHistory } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await register(email, password);
      history.push("/");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const loadingBtn = (
    <Button variant="primary">
      註冊
      <span className="mr-2"></span>
      <LoadingHelper />
    </Button>
  );
  return (
    <div className="container" {...props}>
      <div>
        <Link to="/login">{"< 回登入"}</Link>
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
                註冊
              </Button>
            )}
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default styled(Register)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
