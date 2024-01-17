import { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import UserDetails from './components/UserDetails'
import Home from './components/Home'
import Info from './components/Info'
import Todos from './components/Todos'
import Posts from './components/Posts'
import Albums from './components/Albums'
import './App.css'

const curUser = createContext()

function App() {

  const [cur_user, setCurUser] = useState("");

  const setUser = (data) => {
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

          <Route path="/home/users/:id" element={<Home />}>
            <Route path="info" element={<Info />} />
            {/* <Route path="posts" element={<Posts />} /> */}
            <Route path="albums" element={<Albums />} />
          </Route>
          <Route path="/home/users/:id/posts" element={<Posts />} />
          <Route path="/home/users/:id/todos" element={<Todos />} />

        </Routes>
      </Router>
    </curUser.Provider>
  )
}

export { App, curUser }
