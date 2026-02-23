import styled from "styled-components";

export default function Laboratorio({ context }) {
  const { ideias } = context;
  return (
    <Tela>
      <Header>
        <h1>Laboratorio de Alquimia</h1>
        <p>Espaco para ideias de produto, operacao e experiencia.</p>
      </Header>
      <Lista>
        {ideias.map((ideia) => (
          <Card key={ideia.id}>
            <Tag>{ideia.tag}</Tag>
            <h2>{ideia.titulo}</h2>
            <p>{ideia.descricao}</p>
            <Autor>
              <span>Por {ideia.autor}</span>
              <small>{ideia.status}</small>
            </Autor>
            <Footer>
              <button>Upvote {ideia.votos}</button>
              <button>Ver comentarios</button>
            </Footer>
          </Card>
        ))}
      </Lista>
      <Form>
        <h2>Registrar nova ideia</h2>
        <input placeholder="Titulo da ideia" />
        <select>
          <option>Produto</option>
          <option>Operacao</option>
          <option>Experiencia</option>
        </select>
        <textarea placeholder="Descreva resumidamente o impacto esperado" />
        <button>Enviar para analise</button>
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
  margin-bottom: 20px;
  p {
    color: #bfbfbf;
  }
`;

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  h2 {
    margin: 5px 0 10px 0;
  }
  p {
    color: #f5f5f5;
    font-size: 14px;
    flex: 1;
  }
`;

const Tag = styled.span`
  font-size: 12px;
  color: #f2784a;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const Autor = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  span {
    color: #f2784a;
  }
  small {
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
`;

const Footer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  button {
    flex: 1;
    height: 34px;
    border-radius: 10px;
    border: 0;
    background-color: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Form = styled.div`
  margin: 30px auto 0 auto;
  max-width: 600px;
  background-color: #2f2f2f;
  border-radius: 18px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  input,
  select,
  textarea {
    border-radius: 10px;
    border: 2px solid #3f3f3f;
    background-color: transparent;
    color: white;
    padding: 10px;
  }
  textarea {
    min-height: 100px;
  }
  button {
    height: 40px;
    border: 0;
    border-radius: 12px;
    background-color: white;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;
