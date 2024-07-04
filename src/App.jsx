import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries/Enquiries";
import Blog from "./pages/Blog/Blog";
import Blogcatlist from "./pages/Blog/Blogcatlist";
import Order from "./pages/Orders/Order";
import Customers from "./pages/Custom/Customers";
import Colors from "./pages/Product/Colors";
import Products from "./pages/Product/Products";
import Brands from "./pages/Product/Brands";
import ProductCategory from "./pages/Product/ProductCategory";
import AddBlog from "./pages/Blog/AddBlog";
import AddProduct from "./pages/Product/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import UpdateProduct from "./pages/Product/UpdateProduct";
import UpdateCustomer from "./pages/Custom/UpdateCustomer";

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
            <Route path="customers" element={<Customers />} />
            <Route path="customers/edit/:id" element={<UpdateCustomer />} />
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
