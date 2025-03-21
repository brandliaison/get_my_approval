import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import UIkit from 'uikit'; // Import UIkit JS
import Icons from 'uikit/dist/js/uikit-icons'; // Import UIkit icons
import About from './pages/About';
import Home from './pages/Home';
import Header from './layout/header/Header';
import './../../../resources/css/style.css'; // my default styles of fornt end
import Footer from './layout/footer/Footer';
import Services from './pages/Services';
import Notification from './pages/Notification';
import Tutorial from './pages/Tutorial';
import apiClient from './frontservices/api';
import ServicePartnerForm from './pages/Forms/ServicePartnerForm';

// Load UIkit icons (optional)
UIkit.use(Icons);

function App() {

  const [layoutdata, sdetlayoutdata] = useState([]);

  useEffect(() => {
    layoutcall();
  }, []);

  const layoutcall = () => {
    apiClient.get('/header-footer').then((response) => {
      sdetlayoutdata(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Router>
      <Header header={layoutdata}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/tutorial" element={<Tutorial />} />

        {/* Forms */}
        <Route path="/service-partner-registraton" element={<ServicePartnerForm />} />
      </Routes>
      <Footer footer={layoutdata}/>
    </Router>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
