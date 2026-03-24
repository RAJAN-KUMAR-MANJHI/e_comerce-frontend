
import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import api from "../../api/axiosConfig";
import "../../styles/main.css";

export function MyProfile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/profile"); // 🔥 backend API
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="profile-container">

      <Card className="profile-card">
        <h3 className="text-center mb-4">My Profile</h3>

        <Row>
          <Col md={6}>
            <p><strong>Name:</strong> {user.name}</p>
          </Col>

          <Col md={6}>
            <p><strong>Email:</strong> {user.email}</p>
          </Col>

          <Col md={6}>
            <p><strong>Mobile:</strong> {user.mobileNumber}</p>
          </Col>

          <Col md={6}>
            <p><strong>Role:</strong> {user.role}</p>
          </Col>
        </Row>
      </Card>

    </Container>
  );
}