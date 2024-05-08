import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelloWorld } from "./pages/HelloWorld.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "../api/context_api/AuthProvider.jsx";
import HomePage from "./pages/HomePage.jsx";
import 'react-app-polyfill/stable';
import PomodoroTimer from "./pages/PomodoroTimer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/helloworld" element={<HelloWorld />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/pomodoro" element={<PomodoroTimer/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
