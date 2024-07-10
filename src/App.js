import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from './First';

import Registro from './Registro';

import Usuario from './Usuario';
import Menu from './Menu';
import { useState } from 'react';

function App() {
  const [usuario,setUsuario]=useState({})
const context={usuario,setUsuario}
  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<First context={context} />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/menu" element={<Menu context={context} />} />
              <Route path="/usuario" element={<Usuario context={context} />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
