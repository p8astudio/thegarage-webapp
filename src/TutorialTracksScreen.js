import styled from "styled-components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeRole, roleLabel } from "./tutorialUtils";

export default function TutorialTracksScreen({ context }) {
  const navigate = useNavigate();
  const { tutorialTracks = [], usuario } = context || {};
  const role = normalizeRole(usuario?.funcao);

  const tracksOrdenadas = useMemo(() => {
    const preferidas = [];
    const demais = [];
    tutorialTracks.forEach((track) => {
      if (normalizeRole(track.role) === role) {
        preferidas.push(track);
      } else {
        demais.push(track);
      }
    });
    return [...preferidas, ...demais];
  }, [tutorialTracks, role]);

  return (
    <Tela>
      <Topo>
        <div>
          <small>Trilhas</small>
          <h2>Escolha por onde caminhar</h2>
          <p>
            Conteudos priorizados para {roleLabel(role)}. Cada trilha junta
            tutoriais curtos com o ritual completo.
          </p>
        </div>
        <Actions>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button onClick={() => navigate("/perfil")}>
            <ion-icon name="home-outline"></ion-icon> Perfil
          </button>
        </Actions>
      </Topo>

      <Grid>
        {tracksOrdenadas.map((track) => (
          <Card key={track.id}>
            <CardHead>
              <RoleTag>{roleLabel(track.role)}</RoleTag>
              <Tempo>{track.duracaoEstimativa}</Tempo>
            </CardHead>
            <h3>{track.titulo}</h3>
            <p>{track.descricao}</p>
            <Destaque>{track.destaque}</Destaque>
            <CardFooter>
              <span>{track.foco}</span>
              <button onClick={() => navigate(`/tutoriais/trilhas/${track.id}`)}>
                Ver tutoriais
              </button>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Tela>
  );
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #202020;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Topo = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
  small {
    color: #f2784a;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
  }
  h2 {
    margin: 4px 0 8px 0;
  }
  p {
    margin: 0;
    color: #d3d3d3;
    max-width: 720px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  button {
    height: 38px;
    padding: 0 12px;
    border-radius: 10px;
    border: 2px solid #f2784a;
    background: transparent;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
  button:hover {
    background: #f2784a;
    color: #202020;
  }
`;

const Grid = styled.div`
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  background: #2f2f2f;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
    color: #d3d3d3;
  }
  button {
    height: 36px;
    border-radius: 10px;
    border: 0;
    background: #f2784a;
    color: #202020;
    padding: 0 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoleTag = styled.span`
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(242, 120, 74, 0.18);
  color: #f2784a;
  font-weight: 700;
  font-size: 12px;
`;

const Tempo = styled.span`
  color: #bfbfbf;
  font-size: 12px;
`;

const Destaque = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 10px;
  color: #d3d3d3;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #bfbfbf;
    font-size: 13px;
  }
`;
