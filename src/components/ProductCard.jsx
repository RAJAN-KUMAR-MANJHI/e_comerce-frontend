

import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import "../styles/main.css";
import { getImageUrl } from "../utils/config";
import api from "../api/axiosConfig";

export function ProductCard({ product }) {

  const [show, setShow] = useState(false);

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  // ✅ ADD TO CART
  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      await api.post("/api/cart/add", {
        userId: userId,
        productId: product._id || product.id,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      localStorage.setItem("cartUpdated", Date.now());

      alert("Product added to cart ✅");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Error adding to cart ❌");
    }
  };

  // ✅ BUY NOW
  const handleBuyNow = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      await api.post("/api/cart/add", {
        userId: userId,
        productId: product._id || product.id,
        quantity: 1,
      });

      alert("Product ready to buy ✅");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Error in buy now ❌");
    }
  };

  return (
    <>
      <Card className="product-card">

        <div className="img-wrapper">
          <img
            src={getImageUrl(product.image)}
            className="product-img"
            alt={product.name}
            onClick={() => setShow(true)}
          />

          {product.discount > 0 && (
            <Badge className="discount-badge">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        <Card.Body className="product-body">

          <div className="product-title">{product.name}</div>
          <div className="product-desc">{product.description}</div>

          <div className="product-meta">
            Stock: {product.stock}
          </div>

          <div className="price-box">
            <span className="final-price">₹{finalPrice}</span>
            {product.discount > 0 && (
              <span className="old-price">₹{product.price}</span>
            )}
          </div>

          <Button
            variant="dark"
            className="w-100 mb-2"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>

          <Button
            variant="success"
            className="w-100"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>

        </Card.Body>
      </Card>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="modal-body-custom">
          <img
            src={getImageUrl(product.image)}
            className="modal-img"
            alt="product"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}