import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import './assets/css/themes/themes_combined.min.css';
import './assets/css/main.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import UIkit from 'uikit'; // Import UIkit JS
import Icons from 'uikit/dist/js/uikit-icons'; // Import UIkit icons
import About from './pages/about/About';
import Home from './pages/home/Home';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Login from './auth/login/Login';
import Services from './pages/services/Services';
import Products from './pages/products/Products';
import Notifications from './pages/notifications/Notifications';
import Tutorials from './pages/tutorials/Tutorials';
import Blogs from './pages/blogs/Blogs';
import AddBlogs from './pages/blogs/AddBlogs';
import EditBlogs from './pages/blogs/EditBlogs';
import BlogCategories from './pages/blogs/blogcategories/BlogCategories';
import AddBlogCategories from './pages/blogs/blogcategories/AddBlogCategories';
import EditBlogCategory from './pages/blogs/blogcategories/EditBlogCategory';
import Revision from './pages/revision/Revision';
import TutorialCategories from './pages/tutorials/tutorialcategory/TutorialCategories';
import AddTutorialCategories from './pages/tutorials/tutorialcategory/AddTutorialCategories';
import EditTutorialCategories from './pages/tutorials/tutorialcategory/EditTutorialCategories';
import NewSubmittedPosts from './pages/revision/NewSubmittedPosts';
import ServiceCategories from './pages/services/ServiceCategories/ServiceCategories';
import AddServiceCategories from './pages/services/ServiceCategories/AddServiceCategories';
import EditServiceCategory from './pages/services/ServiceCategories/EditServiceCategory';

// Load UIkit icons (optional)
UIkit.use(Icons);

export default function App() {
  return (
    <>
    <React.Fragment>
        <Router>
            <Header />
            <Sidebar />
        <Routes>
            <Route path="/op-admin/" element={<Home />} />
            <Route path="/op-admin/about" element={<About />} />
            <Route path="/op-admin/login" element={<Login />} />

            <Route path="/op-admin/services" element={<Services />} />
            <Route path="/op-admin/service-categories" element={<ServiceCategories />} />
            <Route path="/op-admin/add-service-categories" element={<AddServiceCategories />} />
            <Route path="/op-admin/edit-service-category/:id" element={<EditServiceCategory />} />

            <Route path="/op-admin/products" element={<Products />} />
            <Route path="/op-admin/notifications" element={<Notifications />} />
            <Route path="/op-admin/tutorials" element={<Tutorials />} />
            <Route path="/op-admin/blog-categories" element={<BlogCategories />} />
            <Route path="/op-admin/addblog-categories" element={<AddBlogCategories />} />
            <Route path="/op-admin/editblogcategory/:id" element={<EditBlogCategory />} />
            <Route path="/op-admin/blogs" element={<Blogs />} />
            <Route path="/op-admin/addblog" element={<AddBlogs />} />
            <Route path="/op-admin/editblog/:id" element={<EditBlogs />} />
            <Route path="/op-admin/tutorials-categories" element={<TutorialCategories />} />
            <Route path="/op-admin/addtutorials-categories" element={<AddTutorialCategories />} />
            <Route path="/op-admin/edittutorials-categories/:id" element={<EditTutorialCategories />} />
            <Route path="/op-admin/tutorials" element={<Tutorials />} />

            <Route path="/op-admin/new-submitted-posts" element={<NewSubmittedPosts />} />
        </Routes>
        </Router>
    </React.Fragment>
    </>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
