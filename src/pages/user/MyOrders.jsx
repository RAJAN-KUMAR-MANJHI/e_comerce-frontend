

import { useEffect, useState } from "react";
import { Container, Card, Badge, Spinner, Button } from "react-bootstrap";
import api from "../../api/axiosConfig";
import "../../styles/main.css";
import { getImageUrl } from "../../utils/config";

export function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "PENDING": return "warning";
      case "CONFIRMED": return "info";
      case "DELIVERED": return "success";
      case "CANCELLED": return "danger";
      default: return "secondary";
    }
  };

  // 🔥 CANCEL ORDER
  const handleCancel = async (orderId) => {
    try {
      await api.delete(`/api/orders/cancel/${orderId}`);
      alert("Order Cancelled ❌");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Cancel Failed");
    }
  };

  // 🔥 BUY AGAIN
  const handleBuyAgain = async (item) => {
    try {
      await api.post("/api/orders/buy-now", {
        productId: item.product.id,
        quantity: item.quantity,
        address: "Default Address",
        paymentMethod: "COD"
      });

      alert("Order placed again ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to order again");
    }
  };

  return (
    <Container className="orders-container">

      <h2 className="orders-title">🛒 My Orders</h2>

      {loading && <div className="loader"><Spinner /></div>}

      {!loading && orders.length === 0 && (
        <div className="empty-box">
          <h5>No Orders Found</h5>
        </div>
      )}

      {!loading && orders.map((order) => (
        <Card key={order.id} className="order-card">

          {/* HEADER */}
          <div className="order-header">
            <div>
              <p className="order-id">Order #{order.id}</p>
              <p className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <Badge bg={getStatusVariant(order.status)}>
              {order.status}
            </Badge>
          </div>

          {/* PRICE + PAYMENT */}
          <div className="order-meta">
            <span>Total: ₹{order.totalAmount}</span>
            <span>Payment: {order.paymentMethod}</span>
          </div>

          {/* ITEMS */}
          {order.items?.map((item) => {
            const img = getImageUrl(item.product?.image);

            return (
              <div key={item.id} className="order-item">

                <img
                  src={img}
                  alt=""
                  className="product-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-product.png";
                  }}
                />

                <div className="item-details">
                  <h6>{item.product?.name}</h6>
                  <p>₹{item.price} × {item.quantity}</p>
                </div>

                <div className="item-price">
                  ₹{item.price * item.quantity}
                </div>

                <div className="item-actions">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleBuyAgain(item)}
                  >
                    Buy Again
                  </Button>
                </div>

              </div>
            );
          })}

          {/* ACTIONS */}
          <div className="order-actions">

            <Button size="sm" variant="outline-info">
              Track Order
            </Button>

            {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleCancel(order.id)}
              >
                Cancel Order
              </Button>
            )}

          </div>

        </Card>
      ))}

    </Container>
  );
}