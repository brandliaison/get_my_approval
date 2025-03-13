import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import UIkit from 'uikit'; // Import UIkit JS
import Icons from 'uikit/dist/js/uikit-icons'; // Import UIkit icons
import About from './pages/About';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);