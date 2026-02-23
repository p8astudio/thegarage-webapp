import styled from "styled-components";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { roleLabel } from "./tutorialUtils";

export default function TutorialDetailScreen({ context }) {
  const { trackId, tutorialId } = useParams();
  const navigate = useNavigate();
  const {
    tutorials = [],
    tutorialTracks = [],
    marcarTutorialConcluido
  } = context || {};

  const tutorial = useMemo(
    () => tutorials.find((item) => item.id === tutorialId),
    [tutorialId, tutorials]
  );
  const trilha = tutorialTracks.find((track) => track.id === trackId);

  if (!tutorial) {
    return (
      <Tela>
        <Vazio>
          Tutorial nao encontrado.
          <button onClick={() => navigate(-1)}>Voltar</button>
        </Vazio>
      </Tela>
    );
  }

  const toggleConcluido = () => {
    if (marcarTutorialConcluido) {
      marcarTutorialConcluido(tutorial.id, !tutorial.concluido);
    }
  };

  return (
    <Tela>
      <Topo>
        <div>
          <small>{trilha?.titulo || "Trilha"}</small>
          <h2>{tutorial.titulo}</h2>
          <p>{tutorial.resumo}</p>
          <Meta>
            <Badge>{roleLabel(tutorial.role)}</Badge>
            {tutorial.tempoMinutos ? (
              <span>{tutorial.tempoMinutos} min</span>
            ) : null}
          </Meta>
        </div>
        <Actions>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button onClick={toggleConcluido}>
            {tutorial.concluido ? "Reabrir" : "Marcar como concluido"}
          </button>
        </Actions>
      </Topo>

      <Steps>
        {tutorial.steps.map((step, index) => (
          <Step key={step.id}>
            <Circle>{index + 1}</Circle>
            <div>
              <h4>{step.titulo}</h4>
              <p>{step.descricao}</p>
            </div>
          </Step>
        ))}
      </Steps>
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

const Meta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
  span {
    color: #bfbfbf;
  }
`;

const Badge = styled.span`
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(242, 120, 74, 0.18);
  color: #f2784a;
  font-weight: 700;
  font-size: 12px;
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
  button:nth-child(2) {
    background: #f2784a;
    color: #202020;
    border: 0;
  }
  button:hover:first-child {
    background: rgba(242, 120, 74, 0.1);
  }
`;

const Steps = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Step = styled.div`
  background: #2f2f2f;
  border-radius: 16px;
  padding: 14px;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  align-items: start;
  h4 {
    margin: 2px 0 4px 0;
  }
  p {
    margin: 0;
    color: #d3d3d3;
  }
`;

const Circle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(242, 120, 74, 0.16);
  color: #f2784a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
`;

const Vazio = styled.div`
  background: #2f2f2f;
  color: #d3d3d3;
  padding: 18px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  button {
    height: 34px;
    padding: 0 12px;
    border-radius: 10px;
    border: 0;
    background: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;
