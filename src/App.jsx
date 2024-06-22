import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Blog from "./pages/Blog";
import Blogcatlist from "./pages/Blogcatlist";
import Order from "./pages/Order";
import Customers from "./pages/Customers";
import Colors from "./pages/Colors";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import ProductCategory from "./pages/ProductCategory";
import AddBlog from "./pages/AddBlog";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token?" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog-categorys" element={<Blogcatlist />} />
            <Route path="orders" element={<Order />} />
            <Route path="customer" element={<Customers />} />
            <Route path="product-colors" element={<Colors />} />
            <Route path="products" element={<Products />} />
            <Route path="product-brands" element={<Brands />} />
            <Route path="product-categorys" element={<ProductCategory />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="products/add-product" element={<AddProduct />} />
            <Route path="products/update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
