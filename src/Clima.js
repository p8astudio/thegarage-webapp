import styled from "styled-components";

export default function Clima({ context }) {
  const { clima } = context;
  return (
    <Tela>
      <Header>
        <h1>Clima da Tripulacao</h1>
        <p>Pulse rapido para monitorar saude, cansaco e energia dos turnos.</p>
      </Header>
      <Lista>
        {clima.map((registro) => (
          <Card key={registro.id}>
            <small>{registro.data}</small>
            <h2>{registro.turno}</h2>
            <Status status={registro.status}>{registro.status}</Status>
            <p>{registro.comentario}</p>
          </Card>
        ))}
      </Lista>
      <Form>
        <h2>Registrar novo pulso</h2>
        <select>
          <option>Azul - Suave</option>
          <option>Amarelo - Cansado</option>
          <option>Vermelho - Sobrecarregado</option>
        </select>
        <textarea placeholder="Comentario opcional" />
        <button>Enviar sinal</button>
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 15px;
  box-sizing: border-box;
  h2 {
    margin: 4px 0;
  }
  p {
    color: #f5f5f5;
  }
`;

const Status = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: ${(props) =>
    props.status === "Vermelho"
      ? "#EB5757"
      : props.status === "Amarelo"
      ? "#E6A060"
      : "#4FB0A6"};
  font-weight: 700;
`;

const Form = styled.div`
  max-width: 500px;
  margin: 30px auto 0 auto;
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  select,
  textarea {
    border-radius: 10px;
    border: 2px solid #3f3f3f;
    background-color: transparent;
    color: white;
    padding: 10px;
  }
  textarea {
    min-height: 90px;
  }
  button {
    height: 40px;
    border: 0;
    border-radius: 12px;
    background-color: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;
