import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReturnPolicy from './pages/ReturnPolicy';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
function App() {
  return (
    <Router>
      <Navbar />
       <Routes>
           <Route path ="/" element ={<Home />} />
           <Route path ="/shop" element ={<Home />} />
           <Route path ="/about" element ={<About/>} />
           <Route path ="/return" element ={<ReturnPolicy/>} />
           <Route path ="/disclaimer" element ={<Disclaimer/>} />
           <Route path ="*" element ={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/products/:id" element={<ProductDetail />}/>
           <Route path="/cart" element={<Cart />}/>
           <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
