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
import Comments from './components/Comments'
import Photos from './components/Photos'
import Layout from './components/Layout';
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

          <Route exact path="/register" element={<Layout />}>
            <Route index element={<Register />} />
            <Route path="details" element={<UserDetails />} />
          </Route>

          <Route path="/home/users/:id" element={<Home />}>
            <Route path="info" element={<Info />} />

            <Route exact path='albums' element={<Layout />}>
              <Route index element={<Albums />} />
              <Route path=":albumId/photos" element={<Photos />} />
            </Route>

            <Route exact path="posts" element={<Layout />} >
              <Route index element={<Posts />} />
              <Route path=":postId/comments" element={<Comments />} />
            </Route>

            <Route path="todos" element={<Todos />} />
          </Route>

        </Routes>
      </Router>
    </curUser.Provider>
  )
}

export { App, curUser }
