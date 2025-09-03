import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './header';
import { isAuthed } from './store/auth';
import './App.css'; // Aquí pondremos estilos

function App() {
  const [authed, setAuthed] = useState(isAuthed()); // Estado reactivo

  return (
    <BrowserRouter>
      <Header authed={authed} setAuthed={setAuthed} />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={authed ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={authed ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
