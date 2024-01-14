import { useState,useContext,createContext } from 'react'
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
const curUser =createContext()
function App() {
  const [cur_user,setCurUser]=useState("");
   const setUser=(data)=>{
    setCurUser(data);
   }

  return (
    <curUser.Provider value={{ cur_user, setUser }}>
    <Router>
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />}>
    </Route>
    <Route path="/register/details" element={<UserDetails />} />

    <Route path="/home" element={<Home />}>
      <Route path="info" element={<Info />} />
      <Route path="todos" element={<Todos />} />
      <Route path="posts" element={<Posts />} />
      <Route path="albums" element={<Albums />} />
    </Route>
  </Routes>
</Router>
</curUser.Provider>
    
  )
}

export { App,curUser}
