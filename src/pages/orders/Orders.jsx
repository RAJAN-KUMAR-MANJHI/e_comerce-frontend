// File: src/pages/Order.jsx
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard";
import { Cart } from "../cart/Cart";
import api from "../../api/axiosConfig";

export default function Order() {
  const [products, setProducts] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);

  // Trigger Cart refresh
  const handleCartUpdate = () => setCartUpdated(!cartUpdated);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products"); // your backend products API
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="order-page" style={{ display: "flex", gap: "2rem" }}>
      {/* Products Grid */}
      <div
        className="products"
        style={{
          flex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.length === 0 ? (
          <h4>Loading products...</h4>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCartUpdate={handleCartUpdate} // notify Cart when added
            />
          ))
        )}
      </div>

      {/* Cart */}
      <div className="cart" style={{ flex: 1 }}>
        <Cart cartUpdated={cartUpdated} />
      </div>
    </div>
  );
}