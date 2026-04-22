
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -------------------- API ENDPOINTS --------------------
export const API_ENDPOINTS = {
  CART: "/api/cart",
  ORDERS: "/api/orders",
  PRODUCTS: "/api/products",
  AUTH: "/api/auth",
};

// -------------------- IMAGE HELPER --------------------
export const getImageUrl = (image) => {
  if (!image) return "/default-image.png";

  // ✅ अगर already full URL है (http/https)
  if (image.startsWith("http")) {
    return image;
  }

  // ✅ अगर backend already "uploads/..." भेज रहा है
  if (image.startsWith("uploads/")) {
    return `${BASE_URL}/${image}`;
  }

  // ✅ अगर सिर्फ filename है (chair.jpg)
  return `${BASE_URL}/uploads/${image}`;
};

// -------------------- FILE/UPLOAD HELPER --------------------
export const getUploadUrl = (filePath) => {
  if (!filePath) return null;

  if (filePath.startsWith("http")) {
    return filePath;
  }

  if (filePath.startsWith("uploads/")) {
    return `${BASE_URL}/${filePath}`;
  }

  return `${BASE_URL}/uploads/${filePath}`;
};

// -------------------- BASE URL EXPORT --------------------
export default BASE_URL;