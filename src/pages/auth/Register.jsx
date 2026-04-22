
import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";
export function Register(){


     const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault(); // ✅ important

    try {
      await api.post("/api/auth/register", form);

      alert("Registration Successful ✅");

      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration Failed ❌");
    }
  };


    return(

        <>
        
        <Container className="register-container">

      <Card className="register-card">

        <h3 className="text-center mb-4">Create Account</h3>

        <Form onSubmit={registerUser}>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              name="mobileNumber"
              placeholder="Enter mobile number"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 register-btn"
          >
            Register
          </Button>

          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>

        </Form>

      </Card>

    </Container>
        </>

    )

}