import styled from "styled-components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeRole, roleLabel } from "./tutorialUtils";

export default function Tutoriais({ context }) {
  const navigate = useNavigate();
  const { tutorials = [], tutorialTracks = [], usuario } = context || {};
  const role = normalizeRole(usuario?.funcao);

  const stats = useMemo(() => {
    const totalRole = tutorials.filter(
      (tutorial) => normalizeRole(tutorial.role) === role
    ).length;
    const concluidosRole = tutorials.filter(
      (tutorial) =>
        normalizeRole(tutorial.role) === role && tutorial.concluido === true
    ).length;
    const proximo =
      tutorials.find(
        (tutorial) =>
          normalizeRole(tutorial.role) === role && tutorial.concluido !== true
      ) || tutorials[0];
    return {
      totalRole,
      concluidosRole,
      proximo
    };
  }, [role, tutorials]);

  const trilhaPrincipal =
    tutorialTracks.find((track) => normalizeRole(track.role) === role) ||
    tutorialTracks[0];

  return (
    <Tela>
      <Topo>
        <div>
          <span>Guia dos colaboradores</span>
          <h1>Livro de Tutoriais</h1>
          <p>
            Passo a passo vivo para {roleLabel(role)} manterem a casa girando.
          </p>
          <Acoes>
            <button onClick={() => navigate("/perfil")}>
              <ion-icon name="home-outline"></ion-icon> Perfil
            </button>
            <button onClick={() => navigate("/tutoriais/trilhas")}>
              <ion-icon name="map-outline"></ion-icon> Ver trilhas
            </button>
          </Acoes>
        </div>
        <Resumo>
          <Stat>
            <small>Concluidos</small>
            <strong>
              {stats.concluidosRole}/{stats.totalRole || "-"}
            </strong>
            <em>{roleLabel(role)}</em>
          </Stat>
          <Stat>
            <small>Proximo passo</small>
            <strong>{stats.proximo?.titulo || "Escolha uma trilha"}</strong>
            <Proximo onClick={() => navigate("/tutoriais/trilhas")}>
              Ir para a trilha
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </Proximo>
          </Stat>
        </Resumo>
      </Topo>

      <SectionHeader>
        <div>
          <small>Trilha foco</small>
          <h3>{trilhaPrincipal?.titulo}</h3>
          <p>{trilhaPrincipal?.descricao}</p>
        </div>
        <Pill>
          {trilhaPrincipal?.foco} · {roleLabel(trilhaPrincipal?.role)}
        </Pill>
      </SectionHeader>

      <TrackGrid>
        {tutorialTracks.slice(0, 3).map((track) => (
          <TrackCard key={track.id}>
            <TrackHead>
              <span>{track.foco}</span>
              <strong>{track.duracaoEstimativa}</strong>
            </TrackHead>
            <h4>{track.titulo}</h4>
            <p>{track.descricao}</p>
            <TrackFooter>
              <Badge>{roleLabel(track.role)}</Badge>
              <button onClick={() => navigate(`/tutoriais/trilhas/${track.id}`)}>
                Abrir trilha
              </button>
            </TrackFooter>
          </TrackCard>
        ))}
      </TrackGrid>
    </Tela>
  );
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 60px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Topo = styled.header`
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  background: linear-gradient(135deg, rgba(242, 120, 74, 0.2), #2f2f2f);
  border-radius: 22px;
  padding: 18px;
  box-sizing: border-box;
  h1 {
    margin: 4px 0;
    font-size: 28px;
  }
  p {
    margin: 0;
    color: #d3d3d3;
  }
  span {
    color: #f2784a;
    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
  }
  @media (min-width: 860px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`;

const Acoes = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 42px;
    padding: 0 14px;
    border-radius: 12px;
    border: 2px solid #f2784a;
    background: transparent;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  button:hover {
    background: #f2784a;
    color: #202020;
  }
`;

const Resumo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
`;

const Stat = styled.div`
  background: #2f2f2f;
  border-radius: 16px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  small {
    color: #bfbfbf;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  strong {
    font-size: 18px;
  }
  em {
    color: #f2784a;
    font-style: normal;
    font-weight: 600;
  }
`;

const Proximo = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  width: fit-content;
  padding: 0 12px;
  border-radius: 10px;
  border: 0;
  background: #f2784a;
  color: #202020;
  font-weight: 700;
  cursor: pointer;
  ion-icon {
    font-size: 16px;
  }
`;

const SectionHeader = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 26px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  h3 {
    margin: 4px 0;
    font-size: 22px;
  }
  p {
    margin: 0;
    color: #d3d3d3;
    max-width: 680px;
  }
  small {
    color: #bfbfbf;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

const Pill = styled.div`
  background: #2f2f2f;
  border-radius: 50px;
  padding: 8px 14px;
  font-weight: 700;
  color: #f2784a;
  border: 1px solid rgba(242, 120, 74, 0.4);
`;

const TrackGrid = styled.div`
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

const TrackCard = styled.div`
  background: #2f2f2f;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h4 {
    margin: 0;
    font-size: 18px;
  }
  p {
    margin: 0;
    color: #d3d3d3;
    font-size: 14px;
    min-height: 64px;
  }
  button {
    border: 0;
    background: #f2784a;
    color: #202020;
    border-radius: 12px;
    height: 38px;
    padding: 0 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const TrackHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #bfbfbf;
    font-size: 12px;
    letter-spacing: 0.06em;
  }
  strong {
    color: #f2784a;
  }
`;

const TrackFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.div`
  background: rgba(242, 120, 74, 0.16);
  color: #f2784a;
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 700;
  font-size: 12px;
`;
