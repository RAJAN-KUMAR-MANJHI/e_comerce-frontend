
import { Container } from "react-bootstrap";
import { ProductCard } from "./ProductCard";
import "../styles/main.css"

export function TrendingProducts({ products }) {

  return (

    <div className="trending-wrapper">

      <Container fluid className="px-4">

        {/* Heading */}
        <div className="trending-header d-flex justify-content-between align-items-center">

          <h2 className="trending-title">
            🔥 Trending Products
          </h2>

          <span className="view-all">View All</span>

        </div>

        {/* Scroll Section */}
        <div className="trending-scroll">

          {products.slice(0, 8).map((product) => (

            <div key={product.id} className="trending-card">
              <ProductCard product={product} />
            </div>

          ))}

        </div>

      </Container>

    </div>
  );
}