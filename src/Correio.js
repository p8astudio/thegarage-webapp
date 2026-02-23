import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Correio({ context }) {
  const navigate = useNavigate();
  const { correio = {}, usuario, setUsuario } = context;
  const extrasUsuario = obterCorreioUsuario(usuario?.nome);
  const [aba, setAba] = useState("naoLidas");
  const [naoLidas, setNaoLidas] = useState(() => [
    ...(usuario?.correioBoasVindas || []),
    ...(correio.naoLidas || []),
    ...extrasUsuario.filter((msg) => !msg.lidaEm)
  ]);
  const [lidas, setLidas] = useState([
    ...(correio.lidas || []),
    ...extrasUsuario.filter((msg) => msg.lidaEm)
  ]);
  const [carta, setCarta] = useState({
    assunto: "",
    categoria: "Feedback",
    mensagem: ""
  });
  const [statusEnvio, setStatusEnvio] = useState("");

  const mensagens =
    aba === "naoLidas" ? naoLidas : aba === "lidas" ? lidas : [];

  function marcarComoLida(id) {
    const mensagem = naoLidas.find((item) => item.id === id);
    if (!mensagem) return;
    atualizarMensagemUsuario(usuario?.nome, id, {
      lidaEm: new Date().toISOString().split("T")[0]
    });
    setNaoLidas((prev) => prev.filter((item) => item.id !== id));
    setLidas((prev) => [
      { ...mensagem, lidaEm: new Date().toISOString().split("T")[0] },
      ...prev
    ]);
    setAba("lidas");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!carta.assunto || !carta.mensagem) return;
    setStatusEnvio("Carta enviada aos gestores. Obrigado por compartilhar!");
    setCarta({ assunto: "", categoria: "Feedback", mensagem: "" });
    setTimeout(() => setStatusEnvio(""), 2800);
  }

  function resgatarPremio(mensagem) {
    if (!mensagem?.recompensaDetalhe || mensagem?.recompensaDetalhe?.resgatada) return;
    const detalhe = mensagem.recompensaDetalhe;
    const atual = usuario || {};
    const atualizado = { ...atual };

    if (detalhe.setor === "icone") {
      const numero = Number((detalhe.item || "").replace(/\D/g, ""));
      if (numero) {
        atualizado.iconesDesbloqueados = Array.from(
          new Set([...(atual.iconesDesbloqueados || [1, 2, 3, 4, 5, 6]), numero])
        );
        atualizado.iconeRecompensaPendente = numero;
      }
    }

    if (detalhe.setor === "titulo") {
      atualizado.titulosDesbloqueados = Array.from(
        new Set([...(atual.titulosDesbloqueados || []), detalhe.item])
      );
      atualizado.titulosPendentes = Array.from(
        new Set([...(atual.titulosPendentes || []), detalhe.item])
      );
    }

    if (detalhe.setor === "moedas") {
      const qtd = Number((detalhe.item || "").replace(/\D/g, "")) || 0;
      atualizado.moedas = (atual.moedas || 0) + qtd;
    }

    if (detalhe.setor === "insignia") {
      const badgeAtual = atual.badges || [];
      atualizado.badges = [
        ...badgeAtual,
        { nome: detalhe.item, descricao: "Recebida via Correio Viajante." }
      ];
    }

    if (setUsuario) setUsuario(atualizado);
    localStorage.setItem("usuario", JSON.stringify(atualizado));

    atualizarMensagemUsuario(usuario?.nome, mensagem.id, {
      recompensaDetalhe: { ...detalhe, resgatada: true }
    });
    setNaoLidas((prev) =>
      prev.map((msg) =>
        msg.id === mensagem.id
          ? { ...msg, recompensaDetalhe: { ...msg.recompensaDetalhe, resgatada: true } }
          : msg
      )
    );
    setLidas((prev) =>
      prev.map((msg) =>
        msg.id === mensagem.id
          ? { ...msg, recompensaDetalhe: { ...msg.recompensaDetalhe, resgatada: true } }
          : msg
      )
    );
  }

  return (
    <Tela>
      <Header>
        <span>Correio Viajante</span>
        <h1>Recebimento e Envio de Cartas</h1>
        <p>Recompensas, avisos importantes, feedbacks, e mais!</p>
        <HomeButton onClick={() => navigate("/perfil")} aria-label="Voltar ao perfil">
          <ion-icon name="home-outline"></ion-icon>
        </HomeButton>
        <Tabs>
          <button
            onClick={() => setAba("naoLidas")}
            data-ativo={aba === "naoLidas" ? 1 : 0}
          >
            Nao lidas
            <Badge>{naoLidas.length}</Badge>
          </button>
          <button
            onClick={() => setAba("lidas")}
            data-ativo={aba === "lidas" ? 1 : 0}
          >
            Recebidas e lidas
            <Badge>{lidas.length}</Badge>
          </button>
          <button
            onClick={() => setAba("envio")}
            data-ativo={aba === "envio" ? 1 : 0}
          >
            Envio de Carta
          </button>
        </Tabs>
      </Header>

      {aba === "envio" ? (
        <EnvioCard onSubmit={handleSubmit}>
          <h2>Escreva para os Gestores</h2>
          <p>
            Use o Correio Viajante para mandar feedbacks, ideias, pedidos ou
            relatos do turno.
          </p>
          <label>
            Assunto
            <input
              type="text"
              value={carta.assunto}
              onChange={(e) =>
                setCarta((prev) => ({ ...prev, assunto: e.target.value }))
              }
              placeholder="Ex.: Pedido de suporte extra no turno da noite"
            />
          </label>
          <label>
            Categoria
            <select
              value={carta.categoria}
              onChange={(e) =>
                setCarta((prev) => ({ ...prev, categoria: e.target.value }))
              }
            >
              <option>Feedback</option>
              <option>Reclamacao</option>
              <option>Ideia</option>
              <option>Melhoria de processo</option>
            </select>
          </label>
          <label>
            Mensagem
            <textarea
              value={carta.mensagem}
              onChange={(e) =>
                setCarta((prev) => ({ ...prev, mensagem: e.target.value }))
              }
              rows={5}
              placeholder="Conte nos detalhes do que aconteceu ou como podemos melhorar"
            />
          </label>
          <div>
            <button type="submit">Enviar carta</button>
            {statusEnvio && <Sucesso>{statusEnvio}</Sucesso>}
          </div>
        </EnvioCard>
      ) : (
        <Lista>
          {mensagens.length === 0 ? (
            <Vazio> Nada por aqui no momento.</Vazio>
          ) : (
            mensagens.map((mensagem) => (
              <Card key={mensagem.id}>
                <CardHeader>
                  <small>{mensagem.data}</small>
                  <Prioridade data-prio={mensagem.prioridade}>
                    {mensagem.prioridade}
                  </Prioridade>
                </CardHeader>
                <h2>{mensagem.titulo}</h2>
                <p>{mensagem.corpo}</p>
                {mensagem.recompensa && (
                  <Recompensa>
                    {mensagem.recompensa}
                    {mensagem.recompensa.includes("?") ? (
                      <RecompensaIcone aria-hidden="true">?</RecompensaIcone>
                    ) : null}
                  </Recompensa>
                )}
                <Autor> {mensagem.autor}</Autor>
                <Acoes>
                  <AcoesEsquerda>
                    {mensagem?.recompensaDetalhe && !mensagem?.recompensaDetalhe?.resgatada ? (
                      <button onClick={() => resgatarPremio(mensagem)}>
                        Resgatar premio
                      </button>
                    ) : null}
                    {aba === "naoLidas" ? (
                      <button onClick={() => marcarComoLida(mensagem.id)}>
                        Marcar como lida
                      </button>
                    ) : (
                      <span>Lida em {mensagem.lidaEm || "dia anterior"}</span>
                    )}
                  </AcoesEsquerda>
                  <Reacoes>
                    <span role="img" aria-label="chama">
                      🔥
                    </span>
                    <span role="img" aria-label="escudo">
                      🛡️
                    </span>
                    <span role="img" aria-label="pizza">
                      🍕
                    </span>
                  </Reacoes>
                </Acoes>
              </Card>
            ))
          )}
        </Lista>
      )}
    </Tela>
  );
}

function obterCorreioUsuario(nome) {
  if (!nome) return [];
  const banco = JSON.parse(localStorage.getItem("correioPorUsuario") || "{}");
  return banco[nome] || [];
}

function atualizarMensagemUsuario(nome, idMensagem, patch) {
  if (!nome) return;
  const banco = JSON.parse(localStorage.getItem("correioPorUsuario") || "{}");
  const lista = banco[nome] || [];
  banco[nome] = lista.map((msg) =>
    msg.id === idMensagem ? { ...msg, ...patch } : msg
  );
  localStorage.setItem("correioPorUsuario", JSON.stringify(banco));
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 90px;
`;

const Header = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto 25px auto;
  span {
    color: #f2784a;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
  }
  h1 {
    margin: 6px 0 12px 0;
  }
  p {
    color: #d3d3d3;
  }
`;

const Tabs = styled.div`
  display: inline-flex;
  margin-top: 20px;
  background-color: #2f2f2f;
  border-radius: 14px;
  padding: 4px;
  button {
    border: 0;
    background-color: transparent;
    color: #bfbfbf;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }
  button[data-ativo="1"] {
    background-color: #f2784a;
    color: #202020;
  }
`;

const Badge = styled.span`
  background-color: rgba(32, 32, 32, 0.9);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  border: 1px solid #202020;
`;

const Lista = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid #3a3a3a;
  h2 {
    margin: 8px 0;
  }
  p {
    color: #f5f5f5;
    margin-bottom: 12px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  small {
    color: #bfbfbf;
    letter-spacing: 0.2em;
  }
`;

const Prioridade = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #202020;
  background-color: ${(props) =>
    props["data-prio"] === "Alta"
      ? "#f2784a"
      : props["data-prio"] === "Media"
      ? "#fcb48b"
      : "#d3d3d3"};
`;

const Recompensa = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(242, 120, 74, 0.12);
  color: #f2784a;
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const RecompensaIcone = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f2784a;
  background: rgba(47, 47, 47, 0.9);
  color: #f8d3c0;
  font-size: 13px;
`;

const Autor = styled.span`
  color: #f2784a;
  font-weight: 600;
`;

const Acoes = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: 0;
    border-radius: 8px;
    background-color: white;
    color: #202020;
    height: 36px;
    padding: 0 12px;
    cursor: pointer;
    font-weight: 700;
  }
  span {
    color: #d3d3d3;
  }
`;

const AcoesEsquerda = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Reacoes = styled.div`
  display: flex;
  gap: 8px;
  span {
    font-size: 20px;
    cursor: pointer;
  }
`;

const Vazio = styled.div`
  background: #2f2f2f;
  border: 1px dashed #3a3a3a;
  border-radius: 12px;
  padding: 20px;
  color: #bfbfbf;
  text-align: center;
`;

const EnvioCard = styled.form`
  max-width: 900px;
  margin: 0 auto;
  background: #2f2f2f;
  border-radius: 18px;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  gap: 12px;
  h2 {
    margin: 0;
  }
  p {
    margin: 0 0 8px 0;
    color: #d3d3d3;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-weight: 600;
  }
  input,
  select,
  textarea {
    background: #202020;
    border: 1px solid #414141;
    border-radius: 10px;
    color: white;
    padding: 10px;
    font-size: 15px;
  }
  textarea {
    resize: vertical;
  }
  button[type="submit"] {
    height: 42px;
    background: white;
    color: #202020;
    border: 0;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 4px;
  }
`;

const Sucesso = styled.span`
  display: inline-block;
  color: #7be07d;
  font-weight: 700;
  margin-left: 12px;
`;

const fillUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const HomeButton = styled.button`
  margin: 8px auto 0 auto;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 2px solid #f2784a;
  background: #202020;
  color: #f2784a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
  z-index: 1;
  ion-icon {
    font-size: 28px;
    position: relative;
    z-index: 2;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #f2784a;
    transform: translateY(100%);
    transition: transform 0.2s ease;
    z-index: 1;
  }
  &:hover::before,
  &:active::before {
    transform: translateY(0);
    animation: ${fillUp} 0.2s linear forwards;
  }
  &:hover,
  &:active {
    color: #202020;
  }
`;
