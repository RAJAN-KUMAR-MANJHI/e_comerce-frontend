import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

export function Footer(){
    return(

        <>
        
         <footer style={{ backgroundColor: "#1bb50d", color: "white", marginTop: "40px" }}>
      <Container>

        <Row className="pt-4 pb-3">

          {/* Brand */}
          <Col md={3}>
            <h4>🪑 FurniStore</h4>
            <p>
              Best furniture for your home. We provide modern,
              stylish and comfortable furniture.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h5>Quick Links</h5>
            <p>Home</p>
            <p>Products</p>
            <p>Cart</p>
            <p>Login</p>
          </Col>

          {/* Categories */}
          <Col md={3}>
            <h5>Categories</h5>
            <p>Chairs</p>
            <p>Tables</p>
            <p>Sofas</p>
            <p>Beds</p>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h5>Contact Us</h5>

            <p>
              <FaPhone /> +91 9876543210
            </p>

            <p>
              <FaEnvelope /> support@furnistore.com
            </p>

            <div style={{ fontSize: "20px" }}>
              <FaFacebook style={{ marginRight: "10px" }} />
              <FaInstagram style={{ marginRight: "10px" }} />
              <FaTwitter />
            </div>

          </Col>

        </Row>

        <hr style={{ borderColor: "white" }} />

        <p style={{ textAlign: "center", paddingBottom: "10px" }}>
          © 2026 FurniStore | All Rights Reserved
        </p>

      </Container>
    </footer>
        
        
        
        </>


    )
}