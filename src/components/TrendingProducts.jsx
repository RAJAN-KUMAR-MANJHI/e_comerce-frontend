import { Container } from "react-bootstrap";
import { ProductCard } from "./ProductCard";
import "../styles/main.css";

export function TrendingProducts({ products }) {

  return (
    <div className="trending-wrapper">

      <Container fluid className="px-2">

        <div className="trending-header">
          <h3>🔥 Trending Products</h3>
        </div>

        {/* 🔥 HORIZONTAL SCROLL */}
        <div className="trending-scroll">

          {products.slice(0, 10).map((p) => (
            <div key={p.id} className="scroll-card">
              <ProductCard product={p} />
            </div>
          ))}

        </div>

      </Container>
    </div>
  );
}