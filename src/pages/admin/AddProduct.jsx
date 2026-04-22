import { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import api from "../../api/axiosConfig";
import "../../styles/main.css";

// ✅ BASE URL from env (no hardcode anywhere)
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !description || !category || !imageFile) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("imageFile", imageFile);

      // ✅ API CALL (no hardcoded URL)
      await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product Added ✅");

      // reset
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setPreview(null);

    } catch (err) {
      console.log(err);
      alert("Error adding product ❌");
    }
  };

  // ---------------- IMAGE PREVIEW ----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="add-product-page">

      <Container className="add-product-container">

        <h3 className="add-product-title">Add Product</h3>

        <Form onSubmit={handleSubmit}>

          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          {/* PRICE */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          {/* STOCK */}
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          {/* CATEGORY */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="Chair">Chair</option>
              <option value="Sofa">Sofa</option>
              <option value="Table">Table</option>
              <option value="Bed">Bed</option>
            </Form.Select>
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* IMAGE */}
          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          {/* PREVIEW */}
          {preview && (
            <div className="image-preview">
              <Image src={preview} height={150} rounded />
            </div>
          )}

          {/* SUBMIT */}
          <Button type="submit" className="add-product-btn" variant="success">
            Add Product
          </Button>

        </Form>

      </Container>

    </div>
  );
}