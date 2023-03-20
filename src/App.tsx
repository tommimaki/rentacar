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
import Signin from './components/Signin';
import Profile from './components/profile';
import AuthProvider from './context/authContext';
import AdminPanel from './components/AdminPanel';


function App() {
  return (
    <AuthProvider  >

      <BrowserRouter>
        <div className='relative'>

          <div className="grid grid-rows-layout min-h-screen">
            <Header />
            <div className="row-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Adminpanel" element={<AdminPanel />} />
                <Route path="/About" element={<About />} />
                <Route path="/Cars" element={<Cars />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<Profile />} />

                <Route path="/cars/:carId" element={<CarDetails />} />
              </Routes>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </BrowserRouter >
    </AuthProvider >
  );
}

export default App;
