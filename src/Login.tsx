import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { useAppContext } from "./AppContextProvider";
import { auth } from "./firebase";
import useAuth from "./useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useAppContext();
  const { login } = useAuth();
  const handleForget = () => context?.setIsPwPopupVisible(true);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
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
          <Button variant="primary" type="submit" disabled={isLoading}>
            登入
            {isLoading && (
              <>
                <span className="mr-2"></span>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            )}
          </Button>
          <span className="mr-2"></span>
          <Button onClick={handleForget}>忘記密碼</Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
