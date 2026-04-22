import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { getImageUrl } from "../../utils/config";

export function CategoryPage() {

  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      const catRes = await api.get(`/api/categories/${id}`);
      setCategoryName(catRes.data.name);

      const res = await api.get(`/api/products?categoryId=${id}`);
      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">

      <h3 className="mb-4">{categoryName} Products</h3>

      <Row>

        {products.length > 0 ? (
          products.map((prod) => {

            const finalPrice =
              prod.discount > 0
                ? prod.price - (prod.price * prod.discount) / 100
                : prod.price;

            return (
              <Col md={4} key={prod.id} className="mb-4">

                <Card className="h-100 shadow-sm">

                  {/* IMAGE */}
                  <div style={{ position: "relative" }}>

                    <Card.Img
                      variant="top"
                      src={getImageUrl(prod.image)}
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    {prod.discount > 0 && (
                      <Badge
                        bg="danger"
                        style={{ position: "absolute", top: 10, left: 10 }}
                      >
                        {prod.discount}% OFF
                      </Badge>
                    )}

                  </div>

                  <Card.Body>

                    {/* NAME */}
                    <Card.Title>{prod.name}</Card.Title>

                    {/* DESCRIPTION */}
                    <Card.Text style={{ fontSize: "14px", color: "#555" }}>
                      {prod.description}
                    </Card.Text>

                    {/* PRICE */}
                    <div className="mb-2">

                      <h5 style={{ color: "green" }}>
                        ₹ {finalPrice}
                      </h5>

                      {prod.discount > 0 && (
                        <span style={{
                          textDecoration: "line-through",
                          color: "gray",
                          marginLeft: "8px"
                        }}>
                          ₹ {prod.price}
                        </span>
                      )}

                    </div>

                    {/* STOCK */}
                    <small>
                      Stock: {prod.stock > 0 ? prod.stock : "Out of stock"}
                    </small>

                  </Card.Body>

                </Card>

              </Col>
            );
          })
        ) : (
          <p>No products found for this category.</p>
        )}

      </Row>

    </Container>
  );
}