import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./classCard.css";

function classCard({ item }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default classCard;
