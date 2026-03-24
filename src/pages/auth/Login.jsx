
import { useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export function Login() {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        mobileNumber: mobile,
        password: password
     
      });
         console.log({
  mobileNumber: mobile,
  password: password
});

      // ✅ token save
      localStorage.setItem("token", "Bearer " + res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful ✅");

      // ✅ Redirect (optional but recommended)
    if (res.data.role === "ROLE_ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.log(err);
    alert("Login Failed");
  }
  };

  return (
    <Container className="login-container">

      <Card className="login-card">

        <h3 className="text-center mb-4">Welcome Back 👋</h3>

        <Form onSubmit={handleLogin}>

          {/* Mobile */}
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>

          {/* Password with toggle */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <InputGroup>
              <Form.Control
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-100 login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Links */}
          <div className="text-center mt-3">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <div className="text-center mt-2">
            Don't have an account? <a href="/register">Register</a>
          </div>

        </Form>

      </Card>

    </Container>
  );
}