import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from './First';

import Registro from './Registro';

import Usuario from './Usuario';
import Menu from './Menu';
import { useState } from 'react';
import styled from 'styled-components';

import banana from './imagens/Banana_Levada.jpg'
import cabeca from './imagens/Cabeça_de_Cogumelo.jpg'
import dente from './imagens/Dente_de_Alho.jpg'
import morango from './imagens/Morango_Bundinha.jpg'
import queixada from './imagens/Queixada_Pepper.jpg'
import tomato from './imagens/Tomato_Tomate.jpg'
function App() {
  const [usuario,setUsuario]=useState(JSON.parse(localStorage.getItem('usuario'))||{})
  const imagens=[null,banana,cabeca,dente,morango,queixada,tomato]
const context={usuario,setUsuario,imagens}
  return (
    <div className="App">
        <Router>
          <Show>

          
          <Routes>
              <Route path="/" element={<First context={context} />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/menu" element={<Menu context={context} />} />
              <Route path="/perfil" element={<Usuario context={context} />} />
          </Routes>
          </Show>
        </Router>
    </div>
  );
}
const Show=styled.div`
height:100vh;width:100vw;background-color:#202020;
display:flex;
justify-content:center;
`
export default App;
