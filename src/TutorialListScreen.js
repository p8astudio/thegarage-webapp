import styled from "styled-components";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { normalizeRole, roleLabel } from "./tutorialUtils";

export default function TutorialListScreen({ context }) {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { tutorials = [], tutorialTracks = [], usuario } = context || {};
  const role = normalizeRole(usuario?.funcao);

  const trilha = tutorialTracks.find((track) => track.id === trackId);

  const tutoriaisFiltrados = useMemo(
    () =>
      tutorials.filter(
        (tutorial) =>
          tutorial.trackId === trackId && normalizeRole(tutorial.role) === role
      ),
    [tutorials, trackId, role]
  );

  const concluidos = tutoriaisFiltrados.filter(
    (tutorial) => tutorial.concluido
  ).length;

  return (
    <Tela>
      <Topo>
        <div>
          <small>{trilha ? trilha.foco : "Trilha"}</small>
          <h2>{trilha ? trilha.titulo : "Trilha nao encontrada"}</h2>
          <p>{trilha?.descricao}</p>
          <Info>
            <Badge>{roleLabel(role)}</Badge>
            <span>
              {concluidos}/{tutoriaisFiltrados.length || "-"} concluidos
            </span>
          </Info>
        </div>
        <Actions>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button onClick={() => navigate("/tutoriais/trilhas")}>
            Trilhas
          </button>
        </Actions>
      </Topo>

      <Lista>
        {tutoriaisFiltrados.map((tutorial) => (
          <Item key={tutorial.id}>
            <header>
              <div>
                <small>{trilha?.titulo}</small>
                <h3>{tutorial.titulo}</h3>
              </div>
              <Status concluido={tutorial.concluido}>
                {tutorial.concluido ? "Concluido" : "Em aberto"}
              </Status>
            </header>
            <p>{tutorial.resumo}</p>
            <footer>
              <span>
                {tutorial.tempoMinutos
                  ? `${tutorial.tempoMinutos} min`
                  : "Checklist rapido"}
              </span>
              <ButtonDetalhe
                onClick={() =>
                  navigate(`/tutoriais/trilhas/${trackId}/${tutorial.id}`)
                }
              >
                Abrir passos
              </ButtonDetalhe>
            </footer>
          </Item>
        ))}
        {tutoriaisFiltrados.length === 0 && (
          <Vazio>
            Nenhum tutorial desta trilha para {roleLabel(role)}. Volte para
            escolher outra trilha.
          </Vazio>
        )}
      </Lista>
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
  gap: 14px;
`;

const Topo = styled.div`
  width: 100%;
  max-width: 900px;
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
    margin: 4px 0;
  }
  p {
    margin: 0;
    color: #d3d3d3;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
  span {
    color: #bfbfbf;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  button {
    height: 36px;
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

const Lista = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  background: #2f2f2f;
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  small {
    color: #bfbfbf;
    letter-spacing: 0.06em;
  }
  h3 {
    margin: 2px 0 0 0;
  }
  p {
    margin: 0;
    color: #d3d3d3;
    font-size: 14px;
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer span {
    color: #bfbfbf;
    font-size: 13px;
  }
`;

const Status = styled.span`
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => (props.concluido ? "#202020" : "#f2784a")};
  background: ${(props) =>
    props.concluido ? "#9ef2a6" : "rgba(242, 120, 74, 0.16)"};
`;

const ButtonDetalhe = styled.button`
  background: #f2784a;
  color: #202020;
  border-radius: 10px;
  height: 34px;
  border: 0;
  padding: 0 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Badge = styled.span`
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(242, 120, 74, 0.18);
  color: #f2784a;
  font-weight: 700;
  font-size: 12px;
`;

const Vazio = styled.div`
  background: #2f2f2f;
  color: #d3d3d3;
  padding: 14px;
  border-radius: 12px;
`;
