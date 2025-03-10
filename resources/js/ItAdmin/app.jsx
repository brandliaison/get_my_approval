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
            <Route path="/cms/" element={<Home />} />
            <Route path="/cms/about" element={<About />} />
            <Route path="/cms/login" element={<Login />} />
            <Route path="/cms/services" element={<Services />} />
            <Route path="/cms/products" element={<Products />} />
            <Route path="/cms/notifications" element={<Notifications />} />
            <Route path="/cms/tutorials" element={<Tutorials />} />
            <Route path="/cms/blogs" element={<Blogs />} />
        </Routes>
        </Router>
    </React.Fragment>
    </>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);