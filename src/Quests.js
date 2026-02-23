import styled from "styled-components";

export default function Quests({ context }) {
  const { quests } = context;
  const categorias = quests.reduce((acc, quest) => {
    acc[quest.categoria] = acc[quest.categoria] || [];
    acc[quest.categoria].push(quest);
    return acc;
  }, {});
  return (
    <Tela>
      <Header>
        <h1>Quests & Insignias</h1>
        <p>
          Conecte acoes reais a recompensas visuais. Cada quest tem criterio,
          pontos e historias desbloqueaveis.
        </p>
      </Header>
      {Object.entries(categorias).map(([categoria, lista]) => (
        <Bloco key={categoria}>
          <Categoria>{categoria}</Categoria>
          <Cards>
            {lista.map((quest) => (
              <Card key={quest.id}>
                <h2>{quest.titulo}</h2>
                <p>{quest.descricao}</p>
                <Recompensa>
                  <div>
                    <strong>Recompensa</strong>
                    <span>{quest.recompensa.insignia}</span>
                  </div>
                  <aside>
                    <em>{quest.recompensa.pontos} pts</em>
                    {quest.recompensa.titulo && (
                      <small>{quest.recompensa.titulo}</small>
                    )}
                  </aside>
                </Recompensa>
                <Progresso>
                  <Barra>
                    <Preenchido width={quest.progresso * 100} />
                  </Barra>
                  <span>{Math.round(quest.progresso * 100)}%</span>
                </Progresso>
                <Status>{quest.status}</Status>
              </Card>
            ))}
          </Cards>
        </Bloco>
      ))}
    </Tela>
  );
}

const Tela = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #202020;
  color: white;
  padding: 25px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto 25px auto;
  p {
    color: #bfbfbf;
  }
`;

const Bloco = styled.div`
  max-width: 900px;
  margin: 0 auto 25px auto;
`;

const Categoria = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 12px;
  color: #f2784a;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  h2 {
    margin: 0 0 10px 0;
  }
  p {
    color: #f5f5f5;
    font-size: 14px;
    min-height: 60px;
  }
`;

const Recompensa = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  span {
    color: #f2784a;
    font-weight: 600;
  }
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    em {
      font-style: normal;
      color: white;
      font-weight: 600;
    }
    small {
      color: #d3d3d3;
    }
  }
`;

const Progresso = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Barra = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 10px;
  background-color: #484848;
  overflow: hidden;
`;

const Preenchido = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: #f2784a;
`;

const Status = styled.div`
  margin-top: 8px;
  color: #bfbfbf;
  font-size: 14px;
`;
