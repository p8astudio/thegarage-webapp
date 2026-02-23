import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Painel({ context }) {
  const navigate = useNavigate();
  const { painelGestor, usuario, imagens } = context;
  const isGestor = usuario?.funcao === "Gestao" || usuario?.funcao === "Gestor";
  const {
    engajamento,
    operacao,
    cultura,
    clima,
    destaques = []
  } = painelGestor;
  const inboxInicial = useMemo(
    () => [
      {
        id: "cx-1",
        nome: "Luna Falcao",
        mensagem: "Conseguimos bater a meta da semana. Algum bonus extra?",
        data: "2024-11-14"
      },
      {
        id: "cx-2",
        nome: "Kai",
        mensagem: "Podemos testar turno extra para cobrir domingo?",
        data: "2024-11-13"
      }
    ],
    []
  );
  const [caixa, setCaixa] = useState(inboxInicial);
  const [respostas, setRespostas] = useState({});
  const [statusEnvio, setStatusEnvio] = useState("");
  const [buscaDestinatario, setBuscaDestinatario] = useState("");
  const [destinatariosSelecionados, setDestinatariosSelecionados] = useState([]);
  const colaboradoresBase = useMemo(
    () => [
      {
        id: "c1",
        nome: "Luna Falcao",
        funcao: "Alquimista",
        icone: 2,
        unidade: "Zona Sul",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 14, 21]
      },
      {
        id: "c2",
        nome: "Theo Lima",
        funcao: "Mensageiro",
        icone: 4,
        unidade: "Zona Sul",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 9]
      },
      {
        id: "c3",
        nome: "Carla Menezes",
        funcao: "Entregas",
        icone: 3,
        unidade: "Zona Sul",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 30]
      },
      {
        id: "c4",
        nome: "Ravi Costa",
        funcao: "Alquimista",
        icone: 5,
        unidade: "Barra da Tijuca",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6]
      },
      {
        id: "c5",
        nome: "Nina Prado",
        funcao: "Mensageiro",
        icone: 1,
        unidade: "Jacarepagua",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 43]
      }
    ],
    []
  );
  const clientesBase = useMemo(
    () => [
      {
        id: "u1",
        nome: "Aurora Solis",
        icone: 8,
        unidade: "Barra da Tijuca",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 8]
      },
      {
        id: "u2",
        nome: "Davi Leal",
        icone: 10,
        unidade: "Zona Sul",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6]
      },
      {
        id: "u3",
        nome: "Maya Pires",
        icone: 12,
        unidade: "Jacarepagua",
        iconesDesbloqueados: [1, 2, 3, 4, 5, 6, 12, 26]
      }
    ],
    []
  );
  const [novoEnvio, setNovoEnvio] = useState({
    assunto: "",
    tipo: "Comunicado",
    corpo: "",
    recompensaCodigo: ""
  });
  const [showSugestoes, setShowSugestoes] = useState(false);
  const [showRecompensas, setShowRecompensas] = useState(false);
  const todosIconesDisponiveis = useMemo(
    () => Array.from({ length: Math.max(0, (imagens?.length || 1) - 1) }, (_, i) => i + 1),
    [imagens]
  );
  const opcoesRecompensa = useMemo(
    () => ({
      titulos: ["Explorador", "Guardiao da Massa", "Mensageiro da Aurora"],
      moedas: ["+20 moedas", "+50 moedas", "+100 moedas"],
      insignias: ["Forno Afiado", "Viajante Ouro", "Entrega de Elite"]
    }),
    []
  );
  const destinatarios = useMemo(
    () => [
      { id: "g1", tipo: "grupo", nome: "Toda Equipe" },
      { id: "g2", tipo: "grupo", nome: "Todos os Viajantes" },
      { id: "t1", tipo: "time", nome: "Zona Sul" },
      { id: "t2", tipo: "time", nome: "Barra da Tijuca" },
      { id: "t3", tipo: "time", nome: "Jacarepagua" },
      ...colaboradoresBase.map((c) => ({ ...c, tipo: "colaborador" })),
      ...clientesBase.map((c) => ({ ...c, tipo: "cliente" }))
    ],
    [colaboradoresBase, clientesBase]
  );
  const sugestoes = useMemo(() => {
    const termo = buscaDestinatario.trim().toLowerCase();
    if (!termo) return [];
    return destinatarios
      .filter((dest) => dest.nome.toLowerCase().includes(termo))
      .filter(
        (dest) =>
          !destinatariosSelecionados.some((selecionado) => selecionado.id === dest.id)
      )
      .slice(0, 7);
  }, [buscaDestinatario, destinatarios, destinatariosSelecionados]);
  const iconesRecompensaDisponiveis = useMemo(() => {
    if (todosIconesDisponiveis.length === 0) return [];
    if (destinatariosSelecionados.length === 0) {
      return todosIconesDisponiveis;
    }
    const destinosSet = new Set();
    destinatariosSelecionados.forEach((dest) => {
      if (dest.tipo === "colaborador" || dest.tipo === "cliente") {
        destinosSet.add(dest.nome);
        return;
      }
      if (dest.tipo === "time") {
        colaboradoresBase
          .filter((colab) => colab.unidade === dest.nome)
          .forEach((colab) => destinosSet.add(colab.nome));
        return;
      }
      if (dest.tipo === "grupo" && dest.nome === "Toda Equipe") {
        colaboradoresBase.forEach((colab) => destinosSet.add(colab.nome));
        return;
      }
      if (dest.tipo === "grupo" && dest.nome === "Todos os Viajantes") {
        clientesBase.forEach((cli) => destinosSet.add(cli.nome));
      }
    });
    const destinos = Array.from(destinosSet);
    if (destinos.length === 0) return todosIconesDisponiveis;

    const perfis = [...colaboradoresBase, ...clientesBase];
    const porNome = new Map(perfis.map((p) => [p.nome, p]));

    // Mantem apenas icones que nenhum destinatario selecionado possui.
    return todosIconesDisponiveis.filter((iconeId) =>
      destinos.every((nomeDestino) => {
        const perfil = porNome.get(nomeDestino);
        const desbloqueados = perfil?.iconesDesbloqueados || [1, 2, 3, 4, 5, 6];
        return !desbloqueados.includes(iconeId);
      })
    );
  }, [
    todosIconesDisponiveis,
    destinatariosSelecionados,
    colaboradoresBase,
    clientesBase
  ]);
  const recompensaSelecionadaLabel = useMemo(() => {
    if (!novoEnvio.recompensaCodigo || novoEnvio.recompensaCodigo.startsWith("icone::")) {
      return "Sem recompensa";
    }
    const [, item] = novoEnvio.recompensaCodigo.split("::");
    return item || "Sem recompensa";
  }, [novoEnvio.recompensaCodigo]);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }
    if (!isGestor) {
      navigate("/perfil");
    }
  }, [usuario, isGestor, navigate]);

  if (!usuario || !isGestor) return null;

  function responder(id) {
    if (!respostas[id]) return;
    setCaixa((prev) => prev.map((item) => (item.id === id ? { ...item, respondido: true } : item)));
    setRespostas((prev) => ({ ...prev, [id]: "" }));
  }

  function enviarParaColaborador(e) {
    e.preventDefault();
    if (destinatariosSelecionados.length === 0 || !novoEnvio.corpo || !novoEnvio.assunto) {
      return;
    }
    const destinos = resolverDestinos(destinatariosSelecionados);
    if (destinos.length === 0) return;
    const recompensaDetalhe = parseRecompensa(novoEnvio.recompensaCodigo);
    const caixaCorreio = JSON.parse(localStorage.getItem("correioPorUsuario") || "{}");
    destinos.forEach((nomeDestino) => {
      const novaMensagem = {
        id: `gest-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        titulo: novoEnvio.assunto,
        autor: "Gestao The Garage",
        corpo: novoEnvio.corpo,
        data: new Date().toISOString().split("T")[0],
        recompensa: recompensaDetalhe ? recompensaDetalhe.label : null,
        recompensaDetalhe,
        prioridade: novoEnvio.tipo === "Advertencia" ? "Alta" : "Media",
        tipoMensagem: novoEnvio.tipo
      };
      caixaCorreio[nomeDestino] = caixaCorreio[nomeDestino]
        ? [novaMensagem, ...caixaCorreio[nomeDestino]]
        : [novaMensagem];
    });
    localStorage.setItem("correioPorUsuario", JSON.stringify(caixaCorreio));
    setStatusEnvio(
      `Mensagem enviada para ${destinos.length} destinatario(s) no Correio Viajante.`
    );
    setNovoEnvio({ assunto: "", tipo: "Comunicado", corpo: "", recompensaCodigo: "" });
    setBuscaDestinatario("");
    setDestinatariosSelecionados([]);
    setShowSugestoes(false);
    setTimeout(() => setStatusEnvio(""), 2400);
  }

  function selecionarDestinatario(dest) {
    setDestinatariosSelecionados((prev) => [...prev, dest]);
    setBuscaDestinatario("");
    setShowSugestoes(true);
  }

  function alterarNomeDestinatario(valor) {
    setBuscaDestinatario(valor);
    setShowSugestoes(true);
  }

  function removerDestinatario(id) {
    setDestinatariosSelecionados((prev) =>
      prev.filter((destinatario) => destinatario.id !== id)
    );
  }

  function resolverDestinos(lista) {
    const destinos = new Set();
    lista.forEach((dest) => {
      if (dest.tipo === "colaborador" || dest.tipo === "cliente") {
        destinos.add(dest.nome);
        return;
      }
      if (dest.tipo === "time") {
        colaboradoresBase
          .filter((colab) => colab.unidade === dest.nome)
          .forEach((colab) => destinos.add(colab.nome));
        return;
      }
      if (dest.tipo === "grupo" && dest.nome === "Toda Equipe") {
        colaboradoresBase.forEach((colab) => destinos.add(colab.nome));
        return;
      }
      if (dest.tipo === "grupo" && dest.nome === "Todos os Viajantes") {
        clientesBase.forEach((cli) => destinos.add(cli.nome));
      }
    });
    return Array.from(destinos);
  }

  function parseRecompensa(codigo) {
    if (!codigo) return null;
    const [setor, item] = codigo.split("::");
    if (!setor || !item) return null;
    return {
      setor,
      item,
      label: `${setor.toUpperCase()}: ${item}`,
      resgatada: false
    };
  }

  function selecionarRecompensaIcone(numeroIcone) {
    setNovoEnvio((prev) => ({
      ...prev,
      recompensaCodigo:
        prev.recompensaCodigo === `icone::${numeroIcone}`
          ? ""
          : `icone::${numeroIcone}`
    }));
  }

  return (
    <Tela>
      <Header>
        <h1>Painel do Gestor</h1>
        <p>Visao consolidada do engajamento interno por modulo.</p>
        <HomeButton onClick={() => navigate("/perfil")} aria-label="Voltar ao perfil">
          <ion-icon name="home-outline"></ion-icon>
        </HomeButton>
      </Header>
      <Cards>
        <Card>
          <h2>Engajamento</h2>
          <p>
            {engajamento.ativosSemana}/{engajamento.totalTripulacao} ativos
            nesta semana
          </p>
          <span>{engajamento.tutoriaisConcluidos} tutoriais concluidos</span>
        </Card>
        <Card>
          <h2>Operacao</h2>
          <p>
            Checklists completos: {Math.round(operacao.checklistsCompletos * 100)}%
          </p>
          <span>{operacao.questsOperacionais} quests finalizadas</span>
        </Card>
        <Card>
          <h2>Cultura</h2>
          <p>{cultura.faiscasSemana} faiscas nesta semana</p>
          <span>{cultura.ideiasNovas} ideias novas</span>
        </Card>
        <Card>
          <h2>Clima</h2>
          <p>{clima.alertasVermelhos} alertas vermelhos</p>
          <span>{clima.turnosMonitorados} turnos monitorados</span>
        </Card>
      </Cards>
      <Destaques>
        <h2>Destaques</h2>
        {destaques.map((item) => (
          <li key={item.nome}>
            <strong>{item.nome}</strong>
            <span>{item.titulo}</span>
            <small>{item.insignias} novas insignias</small>
          </li>
        ))}
      </Destaques>
      <CorreioSection>
        <SectionHeader>
          <div>
            <h2>Correio da Gestao</h2>
            <small>Troca de mensagens entre gestores e colaboradores.</small>
          </div>
        </SectionHeader>
        <CorreioGrid>
          <Box>
            <h3>Recebidos</h3>
            <p className="hint">Mensagens vindas dos Correios Viajantes.</p>
            {caixa.map((item) => (
              <CardMsg key={item.id}>
                <MsgHeader>
                  <strong>{item.nome}</strong>
                  <small>{item.data}</small>
                </MsgHeader>
                <p>{item.mensagem}</p>
                <RespostaArea>
                  <textarea
                    placeholder="Responder rapidamente..."
                    value={respostas[item.id] || ""}
                    onChange={(e) =>
                      setRespostas((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                  />
                  <button
                    onClick={() => responder(item.id)}
                    disabled={!respostas[item.id]}
                  >
                    Enviar resposta
                  </button>
                  {item.respondido && <Tag>Respondido</Tag>}
                </RespostaArea>
              </CardMsg>
            ))}
          </Box>
          <Box as="form" onSubmit={enviarParaColaborador}>
            <h3>Correio Viajante</h3>
            <p className="hint">
              Envie uma carta para colaboradores ou viajantes aqui, Gestor.
            </p>
            <label>
              Nome ou time
              <DestinatarioField>
                <input
                  type="text"
                  value={buscaDestinatario}
                  onChange={(e) => alterarNomeDestinatario(e.target.value)}
                  onFocus={() => setShowSugestoes(true)}
                  placeholder="Ex.: Luna, Zona Sul, Toda Equipe"
                />
                {destinatariosSelecionados.length > 0 ? (
                  <DestinatariosSelecionadosList>
                    {destinatariosSelecionados.map((destinatario) => (
                      <DestinatarioSelecionado key={destinatario.id}>
                        {destinatario.tipo !== "time" ? (
                          <AvatarSugestao>
                            {imagens?.[destinatario.icone] ? (
                              <img
                                src={imagens[destinatario.icone]}
                                alt={`${destinatario.nome} avatar`}
                              />
                            ) : (
                              <abbr title={destinatario.nome}>
                                {destinatario.nome.slice(0, 2).toUpperCase()}
                              </abbr>
                            )}
                          </AvatarSugestao>
                        ) : null}
                        <div>
                          <strong>{destinatario.nome}</strong>
                          {destinatario.tipo === "colaborador" ? (
                            <small>{destinatario.funcao}</small>
                          ) : destinatario.tipo === "cliente" ? (
                            <small>Cliente</small>
                          ) : destinatario.tipo === "grupo" ? (
                            <small>Grupo</small>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removerDestinatario(destinatario.id)}
                          aria-label={`Remover ${destinatario.nome}`}
                        >
                          x
                        </button>
                      </DestinatarioSelecionado>
                    ))}
                  </DestinatariosSelecionadosList>
                ) : null}
                {showSugestoes && sugestoes.length > 0 ? (
                  <SugestoesList>
                    {sugestoes.map((dest) => (
                      <SugestaoItem
                        key={dest.id}
                        data-tipo={dest.tipo}
                        onClick={() => selecionarDestinatario(dest)}
                      >
                        {dest.tipo !== "time" ? (
                          <AvatarSugestao>
                            {imagens?.[dest.icone] ? (
                              <img src={imagens[dest.icone]} alt={`${dest.nome} avatar`} />
                            ) : (
                              <abbr title={dest.nome}>
                                {dest.nome.slice(0, 2).toUpperCase()}
                              </abbr>
                            )}
                          </AvatarSugestao>
                        ) : null}
                        <div>
                          <strong>{dest.nome}</strong>
                          {dest.tipo === "colaborador" ? (
                            <small>{dest.funcao}</small>
                          ) : dest.tipo === "cliente" ? (
                            <small>Cliente</small>
                          ) : dest.tipo === "grupo" ? (
                            <small>Grupo</small>
                          ) : null}
                        </div>
                      </SugestaoItem>
                    ))}
                  </SugestoesList>
                ) : null}
              </DestinatarioField>
            </label>
            <label>
              Assunto
              <input
                type="text"
                value={novoEnvio.assunto}
                onChange={(e) => setNovoEnvio((p) => ({ ...p, assunto: e.target.value }))}
                placeholder="Ex.: Bonus pela meta batida"
              />
            </label>
            <label>
              Tipo
              <select
                value={novoEnvio.tipo}
                onChange={(e) => setNovoEnvio((p) => ({ ...p, tipo: e.target.value }))}
              >
                <option value="Comunicado">Comunicado</option>
                <option value="Reconhecimento">Reconhecimento</option>
                <option value="Advertencia">Advertencia</option>
                <option value="Mensagem">Mensagem</option>
              </select>
            </label>
            <label>
              Mensagem
              <textarea
                rows={4}
                value={novoEnvio.corpo}
                onChange={(e) => setNovoEnvio((p) => ({ ...p, corpo: e.target.value }))}
                placeholder="Conteudo que sera entregue ao colaborador"
              />
            </label>
            <label>
              Recompensa (opcional)
              <IconesMiniaturas>
                <IconeMiniaturaBtn
                  type="button"
                  selecionado={!novoEnvio.recompensaCodigo.startsWith("icone::")}
                  onClick={() =>
                    setNovoEnvio((prev) => ({
                      ...prev,
                      recompensaCodigo:
                        prev.recompensaCodigo.startsWith("icone::")
                          ? ""
                          : prev.recompensaCodigo
                    }))
                  }
                  aria-label="Sem icone de recompensa"
                >
                  <span>Sem icone</span>
                </IconeMiniaturaBtn>
                {iconesRecompensaDisponiveis.map((numeroIcone) => (
                  <IconeMiniaturaBtn
                    type="button"
                    key={`icone-${numeroIcone}`}
                    selecionado={novoEnvio.recompensaCodigo === `icone::${numeroIcone}`}
                    onClick={() => selecionarRecompensaIcone(numeroIcone)}
                    aria-label={`Selecionar icone ${numeroIcone}`}
                  >
                    {imagens?.[numeroIcone] ? (
                      <img src={imagens[numeroIcone]} alt={`icone ${numeroIcone}`} />
                    ) : (
                      <abbr title={`icone ${numeroIcone}`}>{numeroIcone}</abbr>
                    )}
                  </IconeMiniaturaBtn>
                ))}
              </IconesMiniaturas>
              <RewardDropdownWrap
                tabIndex={-1}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setShowRecompensas(false);
                  }
                }}
              >
                <RewardDropdownButton
                  type="button"
                  onClick={() => setShowRecompensas((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={showRecompensas}
                >
                  <span>{recompensaSelecionadaLabel}</span>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </RewardDropdownButton>
                {showRecompensas ? (
                  <RewardDropdownMenu role="listbox" aria-label="Selecionar recompensa">
                    <RewardOptionButton
                      type="button"
                      onClick={() => {
                        setNovoEnvio((p) => ({ ...p, recompensaCodigo: "" }));
                        setShowRecompensas(false);
                      }}
                    >
                      Sem recompensa
                    </RewardOptionButton>
                    <RewardSectionTitle>Titulos</RewardSectionTitle>
                    {opcoesRecompensa.titulos.map((item) => (
                      <RewardOptionButton
                        key={`titulo-${item}`}
                        type="button"
                        onClick={() => {
                          setNovoEnvio((p) => ({ ...p, recompensaCodigo: `titulo::${item}` }));
                          setShowRecompensas(false);
                        }}
                      >
                        {item}
                      </RewardOptionButton>
                    ))}
                    <RewardSectionTitle>Moedas</RewardSectionTitle>
                    {opcoesRecompensa.moedas.map((item) => (
                      <RewardOptionButton
                        key={`moedas-${item}`}
                        type="button"
                        onClick={() => {
                          setNovoEnvio((p) => ({ ...p, recompensaCodigo: `moedas::${item}` }));
                          setShowRecompensas(false);
                        }}
                      >
                        {item}
                      </RewardOptionButton>
                    ))}
                    <RewardSectionTitle>Insignias</RewardSectionTitle>
                    {opcoesRecompensa.insignias.map((item) => (
                      <RewardOptionButton
                        key={`insignia-${item}`}
                        type="button"
                        onClick={() => {
                          setNovoEnvio((p) => ({ ...p, recompensaCodigo: `insignia::${item}` }));
                          setShowRecompensas(false);
                        }}
                      >
                        {item}
                      </RewardOptionButton>
                    ))}
                  </RewardDropdownMenu>
                ) : null}
              </RewardDropdownWrap>
            </label>
            <button className="btn-principal" type="submit">
              Enviar ao Correio Viajante
            </button>
            {statusEnvio && <Sucesso>{statusEnvio}</Sucesso>}
          </Box>
        </CorreioGrid>
      </CorreioSection>
      <CTA>
        <button>Exportar CSV</button>
        <button>Conectar dados externos</button>
      </CTA>
    </Tela>
  );
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  padding: 20px;
  padding-bottom: 90px;
  box-sizing: border-box;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  p {
    color: #bfbfbf;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
    font-size: 18px;
    color: #f2784a;
  }
  span {
    color: #d3d3d3;
  }
`;

const Destaques = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0 0 0;
  h2 {
    text-align: center;
    margin: 0 0 12px 0;
  }
  li {
    background-color: #2f2f2f;
    border-radius: 14px;
    padding: 12px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 12px;
    align-items: center;
    margin-bottom: 10px;
  }
  strong {
    justify-self: start;
  }
  span {
    color: #f2784a;
    text-align: center;
    justify-self: center;
  }
  small {
    color: #d3d3d3;
    justify-self: end;
  }
`;

const CTA = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  button {
    flex: 1;
    height: 40px;
    border-radius: 12px;
    border: 0;
    background-color: white;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CorreioSection = styled.section`
  margin-top: 28px;
  background: #2f2f2f;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #3a3a3a;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    margin: 0 0 4px 0;
  }
  small {
    color: #bfbfbf;
  }
`;

const CorreioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 14px;
`;

const Box = styled.div`
  background: #242424;
  border: 1px solid #3a3a3a;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    margin: 0;
  }
  .hint {
    margin: 0;
    color: #bfbfbf;
    font-size: 13px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #d3d3d3;
    font-weight: 600;
    input,
    select,
    textarea {
      background: #202020;
      border: 1px solid #3f3f3f;
      border-radius: 10px;
      color: white;
      padding: 10px;
    }
    textarea {
      resize: vertical;
    }
  }
  .btn-principal {
    align-self: flex-start;
    height: 38px;
    padding: 0 14px;
    border-radius: 10px;
    border: 0;
    background: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CardMsg = styled.div`
  background: #2f2f2f;
  border: 1px solid #3f3f3f;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    margin: 0;
    color: #f5f5f5;
  }
`;

const MsgHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    color: #f2784a;
  }
  small {
    color: #bfbfbf;
  }
`;

const RespostaArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  textarea {
    background: #202020;
    border: 1px solid #3f3f3f;
    border-radius: 10px;
    color: white;
    padding: 10px;
    min-height: 80px;
  }
  button {
    height: 34px;
    border-radius: 8px;
    border: 0;
    background: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
    align-self: flex-start;
    padding: 0 12px;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const Tag = styled.span`
  display: inline-block;
  background: rgba(242, 120, 74, 0.15);
  color: #f2784a;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
  align-self: flex-start;
`;

const Sucesso = styled.span`
  color: #7be07d;
  font-weight: 700;
`;

const DestinatarioField = styled.div`
  position: relative;
`;

const SugestoesList = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  background: #1b1b1b;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  overflow: hidden;
  z-index: 20;
  max-height: 230px;
  overflow-y: auto;
`;

const SugestaoItem = styled.button`
  width: 100%;
  border: 0;
  background: #222222;
  color: #f4f4f4;
  text-align: left;
  padding: 9px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #343434;
  border-left: 4px solid #555;
  strong {
    display: block;
    font-size: 14px;
    color: #f2784a;
    line-height: 1.2;
  }
  small {
    color: #d5d5d5;
    font-size: 12px;
  }
  &:hover {
    @media (hover: hover) {
      background: #f2784a;
      strong {
        color: #ffffff;
      }
      small {
        color: #fff0e8;
      }
    }
  }
  &[data-tipo="time"] {
    border-left-color: #f2784a;
  }
  &[data-tipo="colaborador"] {
    border-left-color: #9a9a9a;
  }
  &[data-tipo="cliente"] {
    border-left-color: #c7c7c7;
  }
  &[data-tipo="grupo"] {
    border-left-color: #f2784a;
  }
`;

const DestinatarioSelecionado = styled.div`
  margin-top: 8px;
  border: 1px solid #f2784a;
  background: #1f1f1f;
  border-radius: 12px;
  padding: 8px 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  strong {
    display: block;
    color: #f2784a;
    line-height: 1.1;
  }
  small {
    color: #d8d8d8;
  }
  button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #555;
    background: #2a2a2a;
    color: #fff;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
`;

const DestinatariosSelecionadosList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const IconesMiniaturas = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  margin-bottom: 4px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: #5a5a5a transparent;
  &::-webkit-scrollbar {
    height: 7px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 10px;
  }
`;

const RewardDropdownWrap = styled.div`
  position: relative;
`;

const RewardDropdownButton = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #3f3f3f;
  background: #202020;
  color: #fff;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16px;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ion-icon {
    font-size: 18px;
    color: #c8c8c8;
  }
`;

const RewardDropdownMenu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  background: #1b1b1b;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  overflow: auto;
  max-height: 250px;
  z-index: 25;
`;

const RewardSectionTitle = styled.div`
  padding: 8px 10px 4px 10px;
  color: #cfcfcf;
  font-size: 13px;
  font-weight: 700;
`;

const RewardOptionButton = styled.button`
  width: 100%;
  border: 0;
  border-top: 1px solid #2b2b2b;
  background: #222222;
  color: #f3f3f3;
  text-align: left;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    @media (hover: hover) {
      background: #f2784a;
      color: #202020;
    }
  }
`;

const IconeMiniaturaBtn = styled.button`
  min-width: 62px;
  width: 62px;
  height: 42px;
  border-radius: 10px;
  border: ${(props) => (props.selecionado ? "2px solid #f2784a" : "1px solid #505050")};
  background: #1f1f1f;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  abbr {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }
  span {
    color: #d9d9d9;
    font-size: 11px;
    padding: 0 6px;
    line-height: 1.2;
  }
`;

const AvatarSugestao = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background: #2f2f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  abbr {
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
  }
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
