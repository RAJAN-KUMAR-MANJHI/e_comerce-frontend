
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

      console.log("FULL RESPONSE:", res.data);

      // ✅ TOKEN SAVE
      localStorage.setItem("token", res.data.token);

      // ✅ USER ID FIX (IMPORTANT)
      const userId =
        res.data.userId ||
        res.data.id ||
        res.data.user?.id;

      if (!userId) {
        alert("User ID not received ❌");
        return;
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful ✅");

      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      alert("Login Failed ❌");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <h3 className="text-center mb-4">Welcome Back 👋</h3>

        <Form onSubmit={handleLogin}>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <InputGroup>
              <Form.Control
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={() => setShowPass(!showPass)}>
                {showPass ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

        </Form>
      </Card>
    </Container>
  );
}