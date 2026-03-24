

import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import api from "../../api/axiosConfig";
import "../../styles/main.css";

export function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my"); // 🔥 backend API
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="orders-container">

      <h3 className="text-center mb-4">My Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center">No Orders Found 😢</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="order-card">

            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>

          </Card>
        ))
      )}

    </Container>
  );
}