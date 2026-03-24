
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Home } from "./pages/Home";
import { Products } from "./pages/products/Products";
import { AdminRoute } from "./routes/AdminRoute";
import { AdminDashboard} from "./pages/admin/AdminDashboard";
import { ManageProducts} from "./pages/admin/ManageProducts";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { AddProduct } from "./pages/admin/AddProduct";
import { Login } from './pages/auth/Login'
import { VerifyOtp } from './pages/auth/VerifyOtp'
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Register } from './pages/auth/Register'
import { Navbarr } from './components/Navbarr'
import { Footer } from './components/Footer'
import { MyProfile } from "./pages/user/MyProfile";
import { MyOrders } from "./pages/user/MyOrders";
import { CategoryPage } from "./pages/products/CategoryPage";
import { Cart } from "./pages/cart/Cart";
function App() {
  

  return (
    <>
      <BrowserRouter>

      <Navbarr />

     <Routes>

          
  {/* PUBLIC ROUTES */}
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/login" element={<Login />} />
  <Route path="/verify-otp" element={<VerifyOtp />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<MyProfile />} />
  <Route path="/orders" element={<MyOrders />} />
  <Route path="/category/:id" element={<CategoryPage />} />
  <Route path="/cart" element={<Cart />} />

  {/* 🔐 ADMIN PROTECTED ROUTES */}
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/add-product"
    element={
      <AdminRoute>
        <AddProduct />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <ManageProducts />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/update-product/:id"
    element={
      <AdminRoute>
        <UpdateProduct />
      </AdminRoute>
    }
  />

           </Routes>

      <Footer />

    </BrowserRouter>

    </>
  )
}

export default App
