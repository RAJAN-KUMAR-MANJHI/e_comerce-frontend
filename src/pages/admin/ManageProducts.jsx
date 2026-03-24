

import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/main.css";

export function ManageProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-dashboard">

      {/* ===== SIDEBAR ===== */}
      <div className="admin-sidebar">
        <h3 className="sidebar-title">Admin Panel</h3>

        <ul>
          <li onClick={() => navigate("/admin/products")} className="active">
            Manage Products
          </li>
          <li onClick={() => navigate("/admin/add-product")}>
            Add Product
          </li>
        </ul>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="admin-content">

        <Container>
          <h3 className="page-title">Manage Products</h3>

          <Table className="product-table" hover responsive>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.stock}</td>

                  <td>
                    <Button
                      className="btn-update me-2"
                      onClick={() => navigate(`/admin/update-product/${p.id}`)}
                    >
                      Update
                    </Button>

                    <Button
                      className="btn-delete"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </Button>
                  </td>

                </tr>
              ))}
            </tbody>

          </Table>
        </Container>

      </div>

    </div>
  );
}