import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import "../styles/main.css";
import api from "../api/axiosConfig";
import { getImageUrl } from "../utils/config";

export function ProductCard({ product, onCartUpdate, onBuyNow }) {

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [show, setShow] = useState(false);

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  // ---------------- ADD TO CART ----------------
  const handleAddToCart = async () => {
    
    console.log("TOKEN CHECK (Add to Cart):", localStorage.getItem("token"));

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      setLoadingCart(true);

      await api.post("/api/cart/add", {
        userId,
        productId: product.id,
        quantity: 1
      });

      alert("Added to cart ✅");

      if (onCartUpdate) onCartUpdate();

    } catch (err) {
      console.log(err);
      alert("Failed to add to cart ❌");
    } finally {
      setLoadingCart(false);
    }
  };

  // ---------------- BUY NOW ----------------
  const handleBuyNow = async () => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      setLoadingBuy(true);

      const res = await api.post("/api/orders/buy-now", {
        userId,
        productId: product.id,
        quantity: 1,
        address: "Default Address",
        paymentMethod: "COD"
      });

      alert("Order placed successfully 🎉");

      if (onBuyNow) onBuyNow(res.data);

    } catch (err) {
      console.log(err);
      alert("Buy failed ❌");
    } finally {
      setLoadingBuy(false);
    }
  };

  return (
    <>
      <Card className="product-card">

        {/* IMAGE */}
        <div className="img-wrapper">
          <Card.Img
            variant="top"
            src={getImageUrl(product.image)}
            className="product-img"
            onClick={() => setShow(true)}
          />

          {product.discount > 0 && (
            <Badge className="discount-badge">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        {/* BODY */}
        <Card.Body className="d-flex flex-column">

          <Card.Title>{product.name}</Card.Title>

          <Card.Text>{product.description}</Card.Text>

          {/* IMPORTANT INFO */}
          <div className="mb-2">
            <div><b>Stock:</b> {product.stock}</div>
            <div><b>Category:</b> {product.category?.name || "N/A"}</div>
          </div>

          <div className="mb-3">
            <span className="final-price">₹ {finalPrice}</span>

            {product.discount > 0 && (
              <span className="old-price">₹ {product.price}</span>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <Button
            variant="dark"
            className="w-100 mb-2"
            onClick={handleAddToCart}
            disabled={loadingCart}
          >
            {loadingCart ? "Adding..." : "Add To Cart"}
          </Button>

          <Button
            variant="success"
            className="w-100"
            onClick={handleBuyNow}
            disabled={loadingBuy}
          >
            {loadingBuy ? "Processing..." : "Buy Now"}
          </Button>

        </Card.Body>
      </Card>

      {/* IMAGE MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Body className="text-center">
          <img
            src={getImageUrl(product.image)}
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}