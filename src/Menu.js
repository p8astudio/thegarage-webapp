import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rodape from "./imagens/rodape.png";

export default function Menu({ context }) {
  const {
    usuario,
    imagens,
    setUsuario,
    setRememberMe,
    correio
  } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  const {
    nome,
    moedas,
    icone,
    titulo = "Viajante desconhecido",
    nivel,
    funcao,
    correioBoasVindas = []
  } = usuario;
  const mensagensNaoLidas =
    (correio?.naoLidas?.length || 0) + (correioBoasVindas?.length || 0);
  const isGestao = funcao === "Gestao";

  const atalhos = [
    {
      label: "Perfil",
      desc: "Ficha do viajante",
      icon: "person-circle-outline",
      path: "/perfil"
    },
    {
      label: "Livro de Registros",
      desc: "Membros The Garage",
      icon: "people-outline",
      path: "/livro-registro"
    },
    {
      label: "Correio Viajante",
      desc: `${mensagensNaoLidas} nao lidas`,
      icon: "mail-unread-outline",
      path: "/correio"
    },
    {
      label: "Tutoriais",
      desc: "Livro da Ordem",
      icon: "book-outline",
      path: "/tutoriais"
    },
    ...(isGestao
      ? [
          {
            label: "Painel",
            desc: "Gestor",
            icon: "analytics-outline",
            path: "/painel"
          }
        ]
      : [])
  ];

  function handleLogout() {
    localStorage.removeItem("usuario");
    localStorage.setItem("rememberMe", "false");
    setRememberMe(false);
    setUsuario(null);
    navigate("/");
  }

  return (
    <Tela>
      <Topo />
      <Perfil>
        <img src={imagens[icone]} alt="icone viajante" />
        <div>
          <h2>{nome}</h2>
          <h3>{titulo}</h3>
          <span>Nvl {nivel}</span>
        </div>
        <LogoutButton onClick={handleLogout} aria-label="Sair">
          <ion-icon name="power-outline"></ion-icon>
        </LogoutButton>
      </Perfil>
      <SectionTitle>Portais principais</SectionTitle>
      <Grid>
        {atalhos.map((item) => (
          <Card key={item.label} onClick={() => navigate(item.path)}>
            <ion-icon name={item.icon}></ion-icon>
            <h5>{item.label}</h5>
            <h6>{item.desc}</h6>
          </Card>
        ))}
      </Grid>
      <Rodape>
        <img src={rodape} alt="rodape the garage" />
      </Rodape>
    </Tela>
  );
}

const Tela = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  padding-bottom: 80px;
  overflow-y: auto;
`;

const Topo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  color: #f2784a;
`;

const Perfil = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 60px;
  align-items: center;
  justify-items: center;
  background-color: #2f2f2f;
  border-radius: 20px;
  padding: 15px;
  box-sizing: border-box;
  width: 90%;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  div {
    text-align: center;
  }
  h2 {
    margin: 0;
    font-size: 22px;
  }
  h3 {
    margin: 4px 0;
    color: #f2784a;
    font-weight: 400;
  }
  span {
    font-size: 14px;
    color: #d3d3d3;
  }
`;

const LogoutButton = styled.button`
  background-color: #2f2f2f;
  border: 2px solid #f2784a;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f2784a;
  transition: transform 0.15s ease, background-color 0.15s ease;
  ion-icon {
    font-size: 26px;
  }
  &:hover {
    background-color: #f2784a;
    color: #202020;
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h4`
  width: 90%;
  margin: 25px 0 10px 0;
  font-size: 20px;
  font-weight: 600;
`;

const Grid = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  ion-icon {
    font-size: 36px;
    margin-bottom: 6px;
    color: #f2784a;
  }
  h5 {
    margin: 0;
  }
  h6 {
    margin: 0;
    color: #bfbfbf;
  }
  &:hover {
    transform: translateY(-4px);
  }
`;

const PainelResumo = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 30px 0;
`;

const ResumoCard = styled.div`
  background-color: #2f2f2f;
  border-radius: 18px;
  padding: 18px;
  box-sizing: border-box;
  header {
    display: flex;
    justify-content: space-between;
    color: #bfbfbf;
    font-size: 13px;
  }
  h4 {
    margin: 10px 0;
  }
  p {
    color: #f5f5f5;
    font-size: 14px;
  }
  footer {
    margin-top: 12px;
    color: #f2784a;
    font-weight: 600;
  }
`;

const Rodape = styled.div`
  margin-top: 30px;
  width: 100%;
  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
`;
