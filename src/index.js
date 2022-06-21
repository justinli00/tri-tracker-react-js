import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from'./components/Header';
import Footer from'./components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import PostDetails from './components/PostDetails';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';

const routing = (
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path ="/" element={<App/>} />
        <Route exact path = '/register' element = {<Register/>} />
        <Route exact path = '/login' element = {<Login/>} />
        <Route exact path = '/logout' element = {<Logout/>} />
        <Route exact path = '/post' element = {<PostDetails/>} />
        <Route exact path = '/create-post' element = {<PostCreate/>} />
        <Route exact path = '/edit-post' element = {<PostEdit/>} />
      </Routes>
      <Footer/>
    </React.StrictMode>
  </BrowserRouter>
)

const root = createRoot(document.getElementById('root'));
root.render(routing);

reportWebVitals();