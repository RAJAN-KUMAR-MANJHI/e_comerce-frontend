import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../styles/Footer.css"

import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (

    <footer className="footer">

      <Container>

        <Row className="pt-5 pb-4">

          {/* Brand */}
          <Col md={3}>
            <h4 className="footer-logo">🪑 FurniStore</h4>
            <p className="footer-text">
              Modern, stylish and comfortable furniture for your dream home.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h5>Quick Links</h5>

            <Link to="/" className="footer-link">Home</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/cart" className="footer-link">Cart</Link>
            <Link to="/login" className="footer-link">Login</Link>

          </Col>

          {/* Categories */}
          <Col md={3}>
            <h5>Categories</h5>

            <Link to="/category/1" className="footer-link">Chairs</Link>
            <Link to="/category/2" className="footer-link">Tables</Link>
            <Link to="/category/3" className="footer-link">Sofas</Link>
            <Link to="/category/4" className="footer-link">Beds</Link>

          </Col>

          {/* Contact */}
          <Col md={3}>
            <h5>Contact Us</h5>

            <p className="footer-text">
              <FaPhone /> +91 7870849283
            </p>

            <p className="footer-text">
              <FaEnvelope /> support@furnistore.com
            </p>

            <div className="social-icons">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>

          </Col>

        </Row>

        <hr />

        <p className="footer-copy">
          © 2026 FurniStore | All Rights Reserved
        </p>

      </Container>

    </footer>
  );
}