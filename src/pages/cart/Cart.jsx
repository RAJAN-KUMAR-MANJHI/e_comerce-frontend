
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Button } from "react-bootstrap";
import "../../styles/cart.css";

export function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart");
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/api/cart/remove/${id}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h2 className="cart-title">🛒 Your Cart</h2>

      <div className="cart-container">

        {/* LEFT SIDE */}
        <div className="cart-items">

          {cartItems.length === 0 ? (
            <h4 className="empty-text">Your cart is empty 😢</h4>
          ) : (
            cartItems.map((item) => (

              <div className="cart-card" key={item.id}>

                <img
                  src={`http://localhost:8080/uploads/${item.product.image}`}
                  className="cart-img"
                />

                <div className="cart-details">
                  <h5>{item.product.name}</h5>
                  <p>{item.product.description}</p>

                  <h6>₹ {item.product.finalPrice}</h6>

                  <span>Qty: {item.quantity}</span>
                </div>

                <Button
                  variant="danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>

              </div>

            ))
          )}

        </div>

        {/* RIGHT SIDE (SUMMARY) */}
        <div className="cart-summary">

          <h4>Order Summary</h4>

          <p>Total Items: {cartItems.length}</p>
          <h3>₹ {totalPrice}</h3>

          <Button className="checkout-btn">
            Proceed to Checkout
          </Button>

        </div>

      </div>

    </div>
  );
}