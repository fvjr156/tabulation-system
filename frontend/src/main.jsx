import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelloWorld } from './pages/HelloWorld.jsx'
import Login from './pages/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/helloworld' element={<HelloWorld/>}/>
	      {/* <Route path='/creator' element={<FormCreator/>}/>
        <Route path='/selector' element={<FormSelector/>}/> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
