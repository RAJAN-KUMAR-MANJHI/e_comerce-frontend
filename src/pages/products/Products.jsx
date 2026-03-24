

import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Container, Row, Col } from "react-bootstrap";
import { ProductCard } from "../../components/ProductCard";
import { Loader } from "../../components/Loader";
import "../../styles/main.css"

export function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/api/products");

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

    <Container className="mt-4">

      <Row style={{ justifyContent: "center" }}>

        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

      </Row>

    </Container>

      
    

    

    

  );

}