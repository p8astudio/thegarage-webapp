import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import First from "./First";
import Registro from "./Registro";
import Usuario from "./Usuario";
import Tutoriais from "./Tutoriais";
import Correio from "./Correio";
import Quests from "./Quests";
import Faiscas from "./Faiscas";
import Laboratorio from "./Laboratorio";
import Clima from "./Clima";
import Painel from "./Painel";
import LivroRegistro from "./LivroRegistro";
import TutorialTracksScreen from "./TutorialTracksScreen";
import TutorialListScreen from "./TutorialListScreen";
import TutorialDetailScreen from "./TutorialDetailScreen";

import banana from "./imagens/Banana_Levada.jpg";
import dente from "./imagens/Dente_de_Alho.jpg";
import morango from "./imagens/Morango_Bundinha.jpg";
import queixada from "./imagens/Queixada_Pepper.jpg";
import tomato from "./imagens/Tomato_Tomate.jpg";
import cabeca from "./imagens/Cabeca_de_Cogumelo.jpg";
import {
  quests,
  correio,
  faiscas,
  ideias,
  clima,
  painelGestor
} from "./mockData";
import { TUTORIAL_TRACKS, ALL_TUTORIALS } from "./tutorialContent";

const baseImagens = [banana, cabeca, dente, morango, queixada, tomato];
const lockedImagens = Array.from({ length: 86 }, (_, i) => {
  try {
    return require(`./imagens/Icone${i + 1}.JPG`);
  } catch (e) {
    return null;
  }
}).filter(Boolean);
const imagens = [null, ...baseImagens, ...lockedImagens];

function App() {
  const [rememberMe, setRememberMe] = useState(() => {
    const stored = localStorage.getItem("rememberMe");
    if (stored === null) return true;
    return stored === "true";
  });
  const [usuario, setUsuario] = useState(() => {
    const remember = localStorage.getItem("rememberMe") === "true";
    if (remember) {
      const salvo = localStorage.getItem("usuario");
      if (salvo) return JSON.parse(salvo);
    }
    return null;
  });
  const [tutorialsState, setTutorialsState] = useState(() =>
    ALL_TUTORIALS.map((tutorial) => ({
      ...tutorial,
      concluido: tutorial.concluido ?? false
    }))
  );

  const marcarTutorialConcluido = (tutorialId, value = true) => {
    setTutorialsState((prev) =>
      prev.map((tutorial) =>
        tutorial.id === tutorialId
          ? { ...tutorial, concluido: value }
          : tutorial
      )
    );
  };

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }
    } else {
      localStorage.setItem("rememberMe", "false");
      localStorage.removeItem("usuario");
    }
  }, [usuario, rememberMe]);

  const context = {
    usuario,
    setUsuario,
    rememberMe,
    setRememberMe,
    imagens,
    tutorials: tutorialsState,
    tutorialTracks: TUTORIAL_TRACKS,
    marcarTutorialConcluido,
    setTutorialsState,
    quests,
    correio,
    faiscas,
    ideias,
    clima,
    painelGestor
  };

  return (
    <div className="App">
      <Router>
        <Show>
          <Routes>
            <Route path="/" element={<First context={context} />} />
            <Route path="/registro" element={<Registro context={context} />} />
            <Route path="/menu" element={<Navigate to="/perfil" replace />} />
            <Route path="/perfil" element={<Usuario context={context} />} />
            <Route path="/tutoriais" element={<Tutoriais context={context} />} />
            <Route
              path="/tutoriais/trilhas"
              element={<TutorialTracksScreen context={context} />}
            />
            <Route
              path="/tutoriais/trilhas/:trackId"
              element={<TutorialListScreen context={context} />}
            />
            <Route
              path="/tutoriais/trilhas/:trackId/:tutorialId"
              element={<TutorialDetailScreen context={context} />}
            />
            <Route path="/correio" element={<Correio context={context} />} />
            <Route
              path="/livro-registro"
              element={<LivroRegistro context={context} />}
            />
            <Route path="/quests" element={<Quests context={context} />} />
            <Route path="/faiscas" element={<Faiscas context={context} />} />
            <Route
              path="/laboratorio"
              element={<Laboratorio context={context} />}
            />
            <Route path="/clima" element={<Clima context={context} />} />
            <Route path="/painel" element={<Painel context={context} />} />
          </Routes>
        </Show>
      </Router>
    </div>
  );
}

const Show = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #202020;
  display: flex;
  justify-content: center;
`;

export default App;
