import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom' 

import Login from './components/Login'
import Register from './components/Register'
import UserDetails from './components/UserDetails'
import Home from './components/Home'
import './App.css';
import { Navigate } from 'react-router-dom';

function App() {
 

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<UserDetails />} />
      <Route path="/home" element={<Home />} /> 
    </Routes>
  </Router>
  )
}

export default App
