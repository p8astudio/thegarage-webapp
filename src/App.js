import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from './First';

import Registro from './Registro';

import Usuario from './Usuario';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<First />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/usuario" element={<Usuario />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
