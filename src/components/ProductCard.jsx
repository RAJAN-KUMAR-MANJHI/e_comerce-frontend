// File: src/components/ProductCard.jsx

import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import "../styles/main.css";
import api from "../api/axiosConfig";

export function ProductCard({ product, onCartUpdate }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const handleAddToCart = async () => {

    // 🔥 DEBUG (important)
    const userId = localStorage.getItem("userId");
    console.log("USER ID:", userId);
    console.log("TOKEN:", localStorage.getItem("token"));

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      setLoading(true);

      // 🔥 CORRECT API CALL (BODY METHOD)
      await api.post("/api/cart/add", {
        userId: userId,
        productId: product.id,
        quantity: 1
      });

      alert("Added to cart ✅");

      // refresh cart if needed
      if (onCartUpdate) onCartUpdate();

    } catch (err) {
      console.log("Add to cart error:", err);
      alert("Failed to add to cart ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="product-card">
        <div className="img-wrapper">
          <Card.Img
            variant="top"
            src={`http://localhost:8080/uploads/${product.image}`}
            className="product-img"
            onClick={() => setShow(true)}
          />

          {product.discount > 0 && (
            <Badge className="discount-badge">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="product-title">
            {product.name}
          </Card.Title>

          <Card.Text className="product-desc">
            {product.description}
          </Card.Text>

          <div className="mb-3">
            <span className="final-price">₹ {finalPrice}</span>

            {product.discount > 0 && (
              <span className="old-price">₹ {product.price}</span>
            )}
          </div>

          <Button
            variant="dark"
            className="mt-auto w-100 add-btn"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add To Cart"}
          </Button>
        </Card.Body>
      </Card>

      {/* 🔍 IMAGE MODAL */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
      >
        <Modal.Body className="text-center">
          <img
            src={`http://localhost:8080/uploads/${product.image}`}
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}