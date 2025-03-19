import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "uikit/dist/css/uikit.min.css"; // Import UIkit CSS
import "./assets/css/themes/themes_combined.min.css";
import "./assets/css/main.min.css";
import "@mdi/font/css/materialdesignicons.min.css";
import UIkit from "uikit"; // Import UIkit JS
import Icons from "uikit/dist/js/uikit-icons"; // Import UIkit icons
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Login from "./auth/login/Login";
import Services from "./pages/services/Services";
import Products from "./pages/products/Products";
import Notifications from "./pages/notifications/Notifications";
import Tutorials from "./pages/tutorials/Tutorials";
import Blogs from "./pages/blogs/Blogs";
import AddBlogs from "./pages/blogs/AddBlogs";
import EditBlogs from "./pages/blogs/EditBlogs";
import BlogCategories from "./pages/blogs/blogcategories/BlogCategories";
import AddBlogCategories from "./pages/blogs/blogcategories/AddBlogCategories";
import EditBlogCategory from "./pages/blogs/blogcategories/EditBlogCategory";
import TutorialCategories from "./pages/tutorials/tutorialcategory/TutorialCategories";
import AddTutorialCategories from "./pages/tutorials/tutorialcategory/AddTutorialCategories";
import EditTutorialCategories from "./pages/tutorials/tutorialcategory/EditTutorialCategories";
import NewSubmittedPosts from "./pages/revision/NewSubmittedPosts";
import ServiceCategories from "./pages/services/ServiceCategories/ServiceCategories";
import AddServiceCategories from "./pages/services/ServiceCategories/AddServiceCategories";
import EditServiceCategory from "./pages/services/ServiceCategories/EditServiceCategory";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AddTutorial from "./pages/tutorials/AddTutorial";
import EditTutorial from "./pages/tutorials/EditTutorial";
import AddServices from "./pages/services/AddServices";
import EditServices from "./pages/services/EditServices";
import ProductCategories from "./pages/products/productcategories.jsx/ProductCategories";
import AddProductCategories from "./pages/products/productcategories.jsx/AddProductCategories";
import EditProductCategories from "./pages/products/productcategories.jsx/EditProductCategories";
import ViewSubmittedPost from "./pages/revision/ViewSubmittedPost";
import AddProducts from "./pages/products/AddProducts";
import EditProducts from "./pages/products/EditProducts";
import NotificationCategories from "./pages/notifications/notificationcategories/NotificationCategories";
import AddNotificationCategories from "./pages/notifications/notificationcategories/AddNotificationCategories";
import EditNotificationCategories from "./pages/notifications/notificationcategories/EditNotificationCategories";
import AddNotifications from "./pages/notifications/AddNotifications";
import EditNotifications from "./pages/notifications/EditNotifications";
import ViewServiceCategory from "./pages/services/ServiceCategories/ViewServiceCategory";
import ViewServices from "./pages/services/ViewServices";

// Load UIkit icons (optional)
UIkit.use(Icons);

export default function App() {
    return (
        <>
            <React.StrictMode>
                <React.Fragment>
                <Router>
                  <Routes>
                      {/* Public Routes */}
                      <Route path="/op-admin/login" element={<Login />} />
                      <Route path="/op-admin/about" element={<About />} />

                      {/* Protected Routes (Only for Authenticated Users) */}
                      <Route path="/op-admin/*" element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="dashboard" element={<Home />} />
                            <Route path="services" element={<Services />} />
                            <Route path="addservices" element={<AddServices />} />
                            <Route path="editservices/:id" element={<EditServices />} />
                            <Route path="view-service/:id" element={<ViewServices />} />
                            <Route path="service-categories" element={<ServiceCategories />} />
                            <Route path="add-service-categories" element={<AddServiceCategories />} />
                            <Route path="edit-service-category/:id" element={<EditServiceCategory />} />
                            <Route path="view-service-category/:id" element={<ViewServiceCategory />} />
                            <Route path="products" element={<Products />} />
                            <Route path="addproducts" element={<AddProducts />} />
                            <Route path="editproducts/:id" element={<EditProducts />} />
                            <Route path="product-categories" element={<ProductCategories />} />
                            <Route path="addproduct-categories" element={<AddProductCategories />} />
                            <Route path="editproduct-categories/:id" element={<EditProductCategories />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="addnotifications" element={<AddNotifications />} />
                            <Route path="editnotifications/:id" element={<EditNotifications />} />
                            <Route path="notification-categories" element={<NotificationCategories />} />
                            <Route path="addnotification-categories" element={<AddNotificationCategories />} />
                            <Route path="editnotification-categories/:id" element={<EditNotificationCategories />} />
                            <Route path="blog-categories" element={<BlogCategories />} />
                            <Route path="addblog-categories" element={<AddBlogCategories />} />
                            <Route path="editblogcategory/:id" element={<EditBlogCategory />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="addblog" element={<AddBlogs />} />
                            <Route path="editblog/:id" element={<EditBlogs />} />
                            <Route path="tutorials-categories" element={<TutorialCategories />} />
                            <Route path="addtutorials-categories" element={<AddTutorialCategories />} />
                            <Route path="edittutorials-categories/:id" element={<EditTutorialCategories />} />
                            <Route path="tutorials" element={<Tutorials />} />
                            <Route path="addtutorials" element={<AddTutorial />} />
                            <Route path="edittutorials/:id" element={<EditTutorial />} />
                            <Route path="new-submitted-posts" element={<NewSubmittedPosts />} />
                            <Route path="submitted-post-view/:id" element={<ViewSubmittedPost />} />
                        </Route>
                      </Route>
                  </Routes>
                </Router>

                </React.Fragment>
            </React.StrictMode>
        </>
    );
}

// export default App
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
