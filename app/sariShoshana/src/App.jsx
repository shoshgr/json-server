import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login'
import Register from './components/Register'
import UserDetails from './components/UserDetails'
import Home from './components/Home'
import Info from './components/Info'
import Todos from './components/Todos'
import Posts from './components/Posts'
import Albums from './components/Albums'

function App() {


  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} >
          <Route path="/register/details" element={<UserDetails />} />
        </Route>

        <Route path="/home" element={<Home />} >
          <Route path="/home/info" element={<Info />} />
          <Route path="/home/todos" element={<Todos />} />
          <Route path="/home/posts" element={<Posts />} />
          <Route path="/home/albums" element={<Albums />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
