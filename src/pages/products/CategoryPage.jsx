
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../api/axiosConfig";

export function CategoryPage(){

         const { id } = useParams(); // category id from URL
            const [products, setProducts] = useState([]);
          const [categoryName, setCategoryName] = useState("");

         useEffect(() => {
           fetchCategoryProducts();
           }, [id]);

            const fetchCategoryProducts = async () => {
             try {
              // 🔹 Fetch category name
              const catRes = await api.get(`/api/categories/${id}`);
              setCategoryName(catRes.data.name);

               // 🔹 Fetch products by category
              const res = await api.get(`/api/products?categoryId=${id}`);
              setProducts(res.data);
             } catch (err) {
              console.log(err);
                }
                };

    return(

        <>
         <Container className="mt-4">
      <h3>{categoryName} Products</h3>
      <Row className="mt-3">
        {products.length > 0 ? (
          products.map((prod) => (
            <Col md={4} key={prod.id} className="mb-3">
              <Card>
                {/* <Card.Img variant="top" src={prod.image} /> */}
                <Card.Img
                     variant="top"
                     src={`http://localhost:8080/uploads/${prod.image}`}
                      style={{ height: "200px", objectFit: "cover" }}
                     />
                <Card.Body>
                  <Card.Title>{prod.name}</Card.Title>
                  <Card.Text>₹ {prod.finalPrice}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </Row>
    </Container> 
        </>
    )


}