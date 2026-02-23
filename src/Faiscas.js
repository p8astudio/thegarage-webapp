import styled from "styled-components";

export default function Faiscas({ context }) {
  const { faiscas } = context;
  return (
    <Tela>
      <Header>
        <h1>Faiscas de Gratidao</h1>
        <p>Troque reconhecimento verdadeiro entre a tripulacao.</p>
        <Resumo>
          <article>
            <strong>{faiscas.recebidas.length}</strong>
            <span>Recebidas</span>
          </article>
          <article>
            <strong>{faiscas.enviadas.length}</strong>
            <span>Enviadas</span>
          </article>
          <article>
            <strong>{faiscas.disponiveis}</strong>
            <span>Disponiveis esta semana</span>
          </article>
        </Resumo>
      </Header>
      <Secao>
        <h2>Caixa de entrada</h2>
        <Lista>
          {faiscas.recebidas.map((item) => (
            <Card key={item.id}>
              <h3>{item.autor}</h3>
              <p>{item.mensagem}</p>
              <small>{item.data}</small>
            </Card>
          ))}
        </Lista>
      </Secao>
      <Secao>
        <h2>Faiscas enviadas</h2>
        <Lista>
          {faiscas.enviadas.map((item) => (
            <Card key={item.id}>
              <h3>Para {item.para}</h3>
              <p>{item.mensagem}</p>
              <small>{item.data}</small>
            </Card>
          ))}
        </Lista>
      </Secao>
      <Form>
        <h2>Mande uma nova faisca</h2>
        <input placeholder="Quem voce quer reconhecer?" />
        <textarea placeholder="Mensagem curta (ex.: valeu por segurar o forno!)" />
        <button disabled={faiscas.disponiveis === 0}>
          {faiscas.disponiveis === 0
            ? "Sem faiscas esta semana"
            : "Enviar faisca"}
        </button>
      </Form>
    </Tela>
  );
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  p {
    color: #bfbfbf;
  }
`;

const Resumo = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 18px;
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2f2f2f;
    border-radius: 14px;
    padding: 12px 18px;
    min-width: 120px;
  }
  strong {
    font-size: 28px;
    color: #f2784a;
  }
  span {
    color: #d3d3d3;
  }
`;

const Secao = styled.section`
  max-width: 900px;
  margin: 25px auto 0 auto;
  h2 {
    margin-bottom: 10px;
  }
`;

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 14px;
  padding: 15px;
  box-sizing: border-box;
  p {
    color: #f5f5f5;
    min-height: 40px;
  }
  small {
    color: #bfbfbf;
  }
`;

const Form = styled.div`
  max-width: 600px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
  input,
  textarea {
    margin: 8px 0;
    border-radius: 10px;
    border: 2px solid #3f3f3f;
    background-color: transparent;
    color: white;
    padding: 10px;
    font-size: 15px;
  }
  textarea {
    min-height: 90px;
  }
  button {
    margin-top: 10px;
    height: 40px;
    border: 0;
    border-radius: 12px;
    background-color: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
  button:disabled {
    background-color: #4d4d4d;
    color: #9b9b9b;
    cursor: not-allowed;
  }
`;
