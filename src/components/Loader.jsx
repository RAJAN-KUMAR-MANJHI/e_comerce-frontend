

import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";

export function Loader() {

  return (

    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "300px" }}
    >

      <Spinner
        animation="border"
        variant="warning"
        style={{ width: "3rem", height: "3rem" }}
      />

    </Container>

  );

}