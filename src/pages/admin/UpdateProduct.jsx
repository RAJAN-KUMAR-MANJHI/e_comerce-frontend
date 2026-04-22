

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Image } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { getImageUrl } from "../../utils/config";
import "../../styles/main.css";

export function UpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ NEW (added only)
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await api.get(`/api/products/${id}`);
    const data = res.data;

    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setDescription(data.description);

    // ✅ NEW (added only)
    setCategoryId(data.category?.id);

    // existing image preview
    setPreview(`${BASE_URL}/uploads/${data.image}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    // ✅ NEW (added only)
    formData.append("categoryId", categoryId);

    // image optional
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      // ✅ UPDATED (header added only)
      await api.put(`/api/products/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product Updated ✅");
      navigate("/admin/products");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="update-page">

      <Container className="update-container">

        <h3 className="update-title">Update Product</h3>

        <Form onSubmit={handleUpdate}>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          {/* ✅ NEW (added only) */}
          <Form.Group className="mb-3">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Form.Group>

          {/* Image */}
          <Form.Group className="mb-3">
            <Form.Label>Update Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          {/* Preview */}
          {preview && (
            <div className="text-center mb-3">
              <Image src={preview} height={150} rounded />
            </div>
          )}

          <Button type="submit" className="update-btn">
            Update Product
          </Button>

        </Form>

      </Container>
    </div>
  );
}