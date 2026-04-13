import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Button } from "react-bootstrap";
import "../../styles/cart.css";

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      console.log("User not logged in");
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/api/cart/${userId}`);

      console.log("RAW CART RESPONSE:", res.data);

      const items = res.data?.items || [];

      setCartItems(items);

      // total price calculate
      const totalAmount = items.reduce(
        (sum, item) => sum + item.product.finalPrice * item.quantity,
        0
      );

      setTotal(totalAmount);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(
        `/api/cart/remove?userId=${userId}&productId=${productId}`
      );
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = async () => {
    try {
      await api.delete(`/api/cart/clear/${userId}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <h4>Cart is empty</h4>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-card">

            <img
              src={`http://localhost:8080/uploads/${item.product.image}`}
              width="100"
            />

            <div>
              <h5>{item.product.name}</h5>
              <p>₹ {item.product.finalPrice}</p>
              <p>Qty: {item.quantity}</p>

              <Button
                variant="danger"
                onClick={() => handleRemove(item.product.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      )}

      <hr />

      <h3>Total: ₹ {total}</h3>

      <Button variant="warning" onClick={handleClear}>
        Clear Cart
      </Button>
    </div>
  );
}