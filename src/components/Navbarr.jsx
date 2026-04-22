import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/main.css";
import api from "../api/axiosConfig";

import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

export function Navbarr() {

  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH CART COUNT =================
  const fetchCartCount = async () => {
    try {
        console.log("USER ID:", userId);
             console.log("TOKEN CHECK (Navbar):", localStorage.getItem("token"));

      if (!userId) return;

      const res = await api.get(`/api/cart/${userId}`);

      const items = res.data?.items || [];
      setCartCount(items.length);

    } catch (err) {
      console.log("Cart count error:", err);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    console.log("TOKEN CHECK (Navbar):", localStorage.getItem("token"));
    fetchCategories();
    fetchCartCount();
  }, []);

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#4113e6" }}
      variant="dark"
      sticky="top"
    >
      <Container fluid>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", fontSize: "22px" }}>
          🪑 FurniStore
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* LEFT MENU */}
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>

            {/* CATEGORIES */}
            <NavDropdown title="Categories">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <NavDropdown.Item
                    key={cat.id}
                    as={Link}
                    to={`/category/${cat.id}`}
                  >
                    {cat.name}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>
                  No Categories
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {/* ADMIN */}
            {token && role === "ROLE_ADMIN" && (
              <Nav.Link as={Link} to="/admin">
                👑 Admin
              </Nav.Link>
            )}

          </Nav>

          {/* SEARCH */}
          <Form className="d-flex me-3">
            <Form.Control type="search" placeholder="Search furniture..." />
            <Button variant="warning">Search</Button>
          </Form>

          {/* RIGHT ICONS */}
          <Nav>

            <Nav.Link as={Link} to="/wishlist">
              <FaHeart size={20} />
            </Nav.Link>

            {/* CART ICON */}
            <Nav.Link as={Link} to="/cart" style={{ position: "relative" }}>
              <FaShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            {/* USER DROPDOWN */}
            <NavDropdown
              title={<FaUser size={20} />}
              align="end"
            >
              {!token ? (
                <>
                  <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}