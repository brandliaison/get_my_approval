import React from 'react';
import ReactDOM from 'react-dom/client';    
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import UIkit from 'uikit'; // Import UIkit JS
import Icons from 'uikit/dist/js/uikit-icons'; // Import UIkit icons
import About from './pages/about/About';
import Home from './pages/home/Home';
import './assets/css/themes/themes_combined.min.css';
import './assets/css/main.min.css';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Login from './auth/login/Login';

// Load UIkit icons (optional)
UIkit.use(Icons);

export default function App() {
  return (
    <>
    <Header />
    <Sidebar />
    <React.Fragment>
        <Router>
        <Routes>
            <Route path="/cms/" element={<Home />} />
            <Route path="/cms/about" element={<About />} />
            <Route path="/cms/login" element={<Login />} />
        </Routes>
        </Router>
    </React.Fragment>
    </>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);