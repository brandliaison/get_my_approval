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
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import AdminLayout from "./components/AdminLayout";

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
                            <Route path="service-categories" element={<ServiceCategories />} />
                            <Route path="add-service-categories" element={<AddServiceCategories />} />
                            <Route path="edit-service-category/:id" element={<EditServiceCategory />} />
                            <Route path="products" element={<Products />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="tutorials" element={<Tutorials />} />
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
                            <Route path="new-submitted-posts" element={<NewSubmittedPosts />} />
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
