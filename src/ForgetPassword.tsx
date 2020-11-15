import React, { useRef, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAppContext } from "./AppContextProvider";
import useAuth from "./useAuth";
import LoadingHelper from "./LoadingHelper";
import useCounter from "./useCounter";

export default function ForgetPassword() {
  const context = useAppContext();
  const { sendPasswordMail } = useAuth();
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, triggerCounter] = useCounter();
  const [messageTicker, setMessageTicker] = useCounter();

  const handleClose = () => {
    context?.setIsPwPopupVisible(false);
    form?.current?.reset();
    setIsSend(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await sendPasswordMail(email);
      setIsLoading(false);
      setIsSend(true);
      triggerCounter(10);
      setMessageTicker(2);
    } catch (err) {
      alert(err.message);
      console.log(err.code);
    }
  };
  const loadingBtn = (
    <Button variant="primary" disabled>
      發送
      <span className="mr-2"></span>
      <LoadingHelper />
    </Button>
  );
  return (
    <Modal size="sm" show={context?.isPwPopupVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>發送忘記密碼信</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onBlur={(e) => setEmail(e.target.value)}
            />
            <div className="mt-2"></div>
            {messageTicker > 0 && <Alert variant="primary">信件已發送</Alert>}
          </Form.Group>
          {isLoading ? (
            loadingBtn
          ) : counter > 0 ? (
            <Button disabled>{counter}秒後可再次發送</Button>
          ) : (
            <Button variant="primary" type="submit">
              發送
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}
