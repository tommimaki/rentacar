import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import LandingPage from './components/landingPage';
import About from './components/about'
import CarDetails from './components/CarDetails';
import Footer from './components/Footer';
import Header from './components/header';
import Cars from './components/Cars';
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-layout min-h-screen">
        <Header />
        <div className="row-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cars" element={<Cars />} />
            <Route path="/Register" element={<Register />} />

            <Route path="/cars/:carId" element={<CarDetails />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
