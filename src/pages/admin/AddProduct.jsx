

import { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import api from "../../api/axiosConfig";
import "../../styles/main.css";
export function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !description || !category || !imageFile) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("imageFile", imageFile);

    try {
      await api.post("/api/products", formData);

      alert("Product Added ✅");

      // Reset
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
   <>
   <div className="add-product-page">  {/* ✅ background */}

    <Container className="add-product-container"> {/* ✅ box */}

      <h3 className="add-product-title">Add Product</h3>

      <Form onSubmit={handleSubmit}>

        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="add-product-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            className="add-product-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        {/* Stock */}
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            className="add-product-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>

        {/* Category */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            className="add-product-input"
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

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="add-product-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Image */}
        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        {preview && (
          <div className="image-preview">
            <Image src={preview} height={150} rounded />
          </div>
        )}

        <Button type="submit" className="add-product-btn" variant="success">
          Add Product
        </Button>

      </Form>

    </Container>
  </div>
   
   </>
  );
}