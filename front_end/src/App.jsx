import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import PrivateRoutes from './components/PrivateRoutes'
import Details from './components/Details'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/add-blog" element={<Add />} />
            <Route path="/details/:id" element={<Details />} />
          
        </Route>
        <Route path="/add/:id" element={<Add />} />
      </Routes>
    </div>
  )
}

export default App
