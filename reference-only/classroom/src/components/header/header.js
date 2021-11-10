import React, { useState } from "react";
import { Navbar, Button, Container, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classroomAPI from "../../api/classroomAPI";

function Header() {
  const [show, setShow] = useState(false);
  const [className, setClassname] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = (e) => {
    console.log(className);
    e.preventDefault();
    classroomAPI.createClass({ name: className });
    alert("Created new class!");
    setShow(false);

    window.location.href = "/";
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Classroom</Navbar.Brand>
          <Button onClick={handleShow}>Add classroom</Button>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="class-name">
              <Form.Label>Class name</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={className}
                onChange={(e) => setClassname(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
