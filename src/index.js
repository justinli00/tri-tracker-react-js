import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Header from'./components/Header'
import Footer from'./components/Footer'

const routing = (
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route 
          path ="/"
          element={<App/>}
        />
      </Routes>
      <Footer/>
    </React.StrictMode>
  </BrowserRouter>
)

const root = createRoot(document.getElementById('root'));
root.render(routing);

reportWebVitals();