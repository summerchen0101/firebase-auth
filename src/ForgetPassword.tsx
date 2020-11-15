import React, { useRef, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAppContext } from "./AppContextProvider";
import useAuth from "./useAuth";

export default function ForgetPassword() {
  const context = useAppContext();
  const { sendPasswordMail } = useAuth();
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    context?.setIsPwPopupVisible(false);
    form?.current?.reset();
    setIsSend(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordMail(email);
      setIsSend(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={context?.isPwPopupVisible} onHide={handleClose}>
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
            {isSend && <Alert variant="primary">信件已發送</Alert>}
          </Form.Group>
          <Button variant="primary" type="submit">
            發送
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
