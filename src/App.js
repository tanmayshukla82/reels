import './App.css';
import Signup from './components/Signup.js';
import Login from './components/Login.js'
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import Feed from './components/Feed';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" exact element={<Feed />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
