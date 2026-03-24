
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css"

export function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <Container>

        <h2 className="dashboard-title">Admin Dashboard</h2>

        <Row className="g-4">

          {/* Add Product */}
          <Col md={4}>
            <Card
              className="dashboard-card add-card"
              onClick={() => navigate("/admin/add-product")}
            >
              <Card.Body>
                <h4>➕ Add Product</h4>
                <p>Add new furniture items</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Manage Product */}
          <Col md={4}>
            <Card
              className="dashboard-card manage-card"
              onClick={() => navigate("/admin/products")}
            >
              <Card.Body>
                <h4>📦 Manage Products</h4>
                <p>Update / Delete products</p>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>

    </div>
  );
}