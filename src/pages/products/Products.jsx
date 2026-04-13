import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Container, Row, Col } from "react-bootstrap";
import { ProductCard } from "../../components/ProductCard";
import { Loader } from "../../components/Loader";
import "../../styles/main.css";
import { useLocation } from "react-router-dom";

export function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // ✅ add

  useEffect(() => {
    fetchProducts();
  }, [location.search]); // ✅ change

  const fetchProducts = async () => {

    try {

      setLoading(true);

      // ✅ get search query
      const queryParams = new URLSearchParams(location.search);
      const search = queryParams.get("search");

      let url = "/api/products";

      // ✅ if search exists
      if (search) {
        url = `/api/products/search?name=${search}`;
      }

      const res = await api.get(url);

      console.log("API Response:", res);
      console.log("Products Data:", res.data);

      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (

   <Container fluid className="mt-4">

  <Row className="g-4 justify-content-center">

    {products.length === 0 ? (
      <h5 className="text-center">No products found 😢</h5>
    ) : (
      products.map((p) => (
        <Col key={p.id} xs="auto">
          <ProductCard product={p} />
        </Col>
      ))
    )}

  </Row>

</Container>

  );
}