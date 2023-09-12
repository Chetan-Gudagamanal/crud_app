
import './App.css';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import {Routes, Route, useParams,BrowserRouter as Router  } from "react-router-dom"
import { useState } from 'react';
import ProductPage from './components/ProductPage';



function App() {
  const [status,setStatus]=useState("")
  return (
    <div className="App">
      <header className="header-class">
        <div className="page-title">CRUD APPLICATION</div>
      </header>
      <section className="section-class">
        <Router>
          <Routes>
          {/* User Registration */}
          <Route path="/register" element={<Register setStatus={setStatus}/>}/>
          <Route path="/homepage" element={<ProductPage setStatus={setStatus}/>}/>
          {/* login page */}
          <Route path="/" element={<LoginPage setStatus={setStatus}/>}/>
          </Routes>
        </Router>
        
      </section>
    </div>
  );
}

export default App;
