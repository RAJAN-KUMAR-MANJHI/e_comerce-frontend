import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Button } from "react-bootstrap";
import "../../styles/cart.css";
import { getImageUrl } from "../../utils/config";

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

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const res = await api.get(`/api/cart/${userId}`);

      const items = res.data?.items || [];

      // 🔥 DEBUG LOGS (IMPORTANT)
      console.log("RAW CART RESPONSE:", res.data);
      console.log("CART ITEMS ARRAY:", items);
      console.log("FIRST ITEM SAMPLE:", items[0]);

      setCartItems(items);

      const totalAmount = items.reduce(
        (sum, item) => sum + item.product.finalPrice * item.quantity,
        0
      );

      setTotal(totalAmount);

    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // ================= REMOVE ITEM =================
  const handleRemove = async (productId) => {
    try {
      console.log("REMOVE CLICKED PRODUCT ID:", productId);

      if (!productId) {
        console.log("❌ PRODUCT ID IS UNDEFINED");
        return;
      }

      await api.delete(
        `/api/cart/remove?userId=${userId}&productId=${productId}`
      );

      fetchCart();

      // 🔥 NAVBAR SYNC
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.log("REMOVE ERROR:", err);
    }
  };

  // ================= CLEAR CART =================
  const handleClear = async () => {
    try {
      await api.delete(`/api/cart/clear/${userId}`);
      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));

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

          <div
            key={item.id}
            className="cart-card"
          >

            {/* 🔥 DEBUG PER ITEM (optional) */}
            {console.log("RENDER ITEM:", item)}

            <img
              src={getImageUrl(item.product.image)}
              width="100"
              alt="product"
            />

            <div>
              <h5>{item.product.name}</h5>
              <p>₹ {item.product.finalPrice}</p>
              <p>Qty: {item.quantity}</p>

              {/* 🔥 REMOVE BUTTON (SAFE ID HANDLING) */}
              <Button
                variant="danger"
                onClick={() =>
                  handleRemove(
                    item.product.id ||
                    item.product.productId ||
                    item.product._id
                  )
                }
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