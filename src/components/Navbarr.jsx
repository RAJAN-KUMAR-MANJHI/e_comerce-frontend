
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "../pages/cart/Cart";

import { useEffect, useState } from "react";
import "../styles/main.css"
import api from "../api/axiosConfig"; // path check karo

import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

export function Navbarr() {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

     useEffect(() => {
       fetchCategories();
       }, []);

       const fetchCategories = async () => {
      try {
         const res = await api.get("/api/categories");
         console.log(res.data); // 🔥 debug
          setCategories(res.data);
        } catch (err) {
        console.log(err);
       }
         };



  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role"); // ✅ IMPORTANT
  navigate("/login");
};

  return (

    <Navbar
      expand="lg"
      style={{ backgroundColor: "#4113e6" }}
      variant="dark"
      sticky="top"
    >

      <Container fluid>

        {/* Logo */}
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", fontSize: "22px" }}>
          🪑 FurniStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">

          {/* Left Menu */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {/* <NavDropdown title="Categories">

              <NavDropdown.Item as={Link} to="/category/chair">
                Chairs
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/category/table">
                Tables
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/category/sofa">
                Sofas
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/category/bed">
                Beds
              </NavDropdown.Item>

            </NavDropdown> */}

            <NavDropdown title="Categories">

          {categories.length > 0 ? (
              categories.map((cat) => (
               <NavDropdown.Item
             key={cat.id}
               as={Link}
                to={`/category/${cat.id}`}  // 🔥 better id use karo
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


            {/* 🔐 Only Admin */}
            {token && role === "ROLE_ADMIN" && (
            <Nav.Link as={Link} to="/admin">
             👑 Admin
           </Nav.Link>
             )}

         </Nav>

          {/* Search */}
          <Form className="d-flex me-3">

            <Form.Control
              type="search"
              placeholder="Search furniture..."
              className="me-2"
            />

            <Button variant="warning">
              Search
            </Button>

          </Form>

          {/* Right Icons */}
          <Nav>

            <Nav.Link as={Link} to="/wishlist">
              <FaHeart size={20} />
            </Nav.Link>

            {/* <Nav.Link as={Link} to="/cart">
              <FaShoppingCart size={20} />
            </Nav.Link> */}

            <Nav.Link as={Link} to="/cart" style={{ position: "relative" }}>
             <FaShoppingCart size={20} />
               <span className="cart-badge">2</span>
                 </Nav.Link>

            {/* User Dropdown */}
            <NavDropdown
              title={<FaUser size={20} />}
              align="end"
              className="user-dropdown"
            >

              {
                !token ? (

                  <>
                    <NavDropdown.Item as={Link} to="/login">
                      Login
                    </NavDropdown.Item>

                    <NavDropdown.Item as={Link} to="/register">
                      Register
                    </NavDropdown.Item>
                  </>

                ) : (

                  <>
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item as={Link} to="/orders">
                      My Orders
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </>

                )
              }

            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );

}