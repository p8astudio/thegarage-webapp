import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const funcoes = ["Alquimista", "Mensageiro", "Entrega", "Gestor"];
const unidades = ["Zona Sul", "Jacarepagua", "Barra da Tijuca"];

const membrosMockados = [
  {
    id: "m1",
    nome: "Luna Falcao",
    funcao: "Alquimista",
    unidade: "Zona Sul",
    turno: "Noite",
    tempoCasa: "8 meses",
    icone: 2,
    foco: "Ajustes de forno para Alho Classico e Marguerita Italiana",
    insignias: ["Forno Afiado", "Guardiao da Massa"]
  },
  {
    id: "m2",
    nome: "Ravi Costa",
    funcao: "Alquimista",
    unidade: "Barra da Tijuca",
    turno: "Tarde",
    tempoCasa: "1 ano",
    icone: 5,
    foco: "Padrao de montagem para Parma Trufada e Pesto TG",
    insignias: ["Mestre da Montagem"]
  },
  {
    id: "m3",
    nome: "Nina Prado",
    funcao: "Mensageiro",
    unidade: "Jacarepagua",
    turno: "Manha",
    tempoCasa: "5 meses",
    icone: 1,
    foco: "Feedbacks de Crostata Classica e Flatbread Parma TG",
    insignias: []
  },
  {
    id: "m4",
    nome: "Theo Lima",
    funcao: "Mensageiro",
    unidade: "Zona Sul",
    turno: "Tarde",
    tempoCasa: "3 meses",
    icone: 4,
    foco: "Comunicacao de campanha da Catuperoni e Hot Pepperoni",
    insignias: ["Voz da Jornada"]
  },
  {
    id: "m5",
    nome: "Felipe Cardozo",
    funcao: "Mensageiro",
    unidade: "Barra da Tijuca",
    turno: "Noite",
    tempoCasa: "11 meses",
    icone: 1,
    foco: "Onboarding com degustacao de Quatro Queijos",
    insignias: []
  },
  {
    id: "m6",
    nome: "Carla Menezes",
    funcao: "Entrega",
    unidade: "Zona Sul",
    turno: "Noite",
    tempoCasa: "6 meses",
    icone: 3,
    foco: "Rotas de Camarao TG e Carne Seca c/ Catupiry",
    insignias: ["Entrega de Elite"]
  },
  {
    id: "m7",
    nome: "Joao Velozo",
    funcao: "Entrega",
    unidade: "Barra da Tijuca",
    turno: "Tarde",
    tempoCasa: "9 meses",
    icone: 6,
    foco: "Pico de entregas de Banana Levada e Churros",
    insignias: []
  },
  {
    id: "m8",
    nome: "Marina Rocha",
    funcao: "Gestor",
    unidade: "Jacarepagua",
    turno: "Manha",
    tempoCasa: "2 anos",
    icone: 2,
    foco: "Escalas para producao de Calzones e Flatbreads",
    insignias: ["Mentor da Tripulacao"]
  },
  {
    id: "m9",
    nome: "Igor Pacheco",
    funcao: "Gestor",
    unidade: "Barra da Tijuca",
    turno: "Noite",
    tempoCasa: "1 ano",
    icone: 5,
    foco: "Treinos de bordas recheadas e combinacao de toppings",
    insignias: ["Gestao Tactica", "Ritmo de Ferro"]
  }
];

const viajantesMockados = [
  {
    id: "v1",
    nome: "Aurora Solis",
    cidade: "Barra da Tijuca",
    tempoJornada: "2 meses",
    icone: 8,
    interesse: "Parma & Rucula, Napolitana e Crostata de Parmesao",
    insignias: ["Viajante Ouro"]
  },
  {
    id: "v2",
    nome: "Davi Leal",
    cidade: "Zona Sul",
    tempoJornada: "5 meses",
    icone: 10,
    interesse: "Catupiresa, Costela ao Barbecue e Flatbread 3 Queijos",
    insignias: []
  },
  {
    id: "v3",
    nome: "Maya Pires",
    cidade: "Jacarepagua",
    tempoJornada: "1 mes",
    icone: 12,
    interesse: "Brigadeiro, Choco Duo e Choco Branco c/ Morango",
    insignias: ["Doces da Jornada"]
  },
  {
    id: "v4",
    nome: "Nico Arantes",
    cidade: "Zona Sul",
    tempoJornada: "9 meses",
    icone: 14,
    interesse: "Frango Loko, Carbonara TG e Pao de Alho TG",
    insignias: []
  }
];
const saboresBase = [
  "Alho Classico",
  "Marguerita Classica",
  "Catuperoni",
  "Parma & Rucula",
  "Quatro Queijos",
  "Camarao TG",
  "Pao de Alho TG",
  "Calzone Brasuca",
  "Flatbread Parma TG",
  "Crostata Classica",
  "Banana Levada",
  "Brigadeiro"
];

export default function LivroRegistro({ context }) {
  const { usuario, imagens } = context || {};
  const navigate = useNavigate();
  const [perfilVisitado, setPerfilVisitado] = useState(null);
  const [recompensaEnvio, setRecompensaEnvio] = useState({
    tipo: "icone",
    descricao: "",
    observacao: ""
  });
  const [statusRecompensa, setStatusRecompensa] = useState("");

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  const isColaborador =
    usuario?.tipoCadastro === "colaborador" ||
    ["Alquimista", "Mensageiro", "Entregas", "Gestao"].includes(usuario?.funcao);
  const isGestor = usuario?.funcao === "Gestao" || usuario?.funcao === "Gestor";

  const agrupado = funcoes.map((funcao) => ({
    funcao,
    unidades: unidades.map((unidade) => {
      const membros = membrosMockados.filter(
        (membro) => membro.funcao === funcao && membro.unidade === unidade
      );
      return { unidade, membros };
    })
  }));

  function saboresTop3(idTexto) {
    const seed = idTexto
      .split("")
      .reduce((acc, letra) => acc + letra.charCodeAt(0), 0);
    return [0, 1, 2].map((offset) => saboresBase[(seed + offset) % saboresBase.length]);
  }

  function abrirPerfilResumido(pessoa, tipo) {
    if (tipo === "colaborador") {
      setPerfilVisitado({
        nome: pessoa.nome,
        titulo: `${pessoa.funcao} da The Garage`,
        detalhe1: `${pessoa.unidade} | ${pessoa.turno}`,
        detalhe2: `Tempo de casa: ${pessoa.tempoCasa}`,
        detalhe3: pessoa.foco,
        insignias: pessoa.insignias || [],
        icone: pessoa.icone,
        tipo,
        sabores: saboresTop3(pessoa.id)
      });
      return;
    }

    setPerfilVisitado({
      nome: pessoa.nome,
      titulo: "Viajante da comunidade",
      detalhe1: `${pessoa.cidade}`,
      detalhe2: `Tempo de jornada: ${pessoa.tempoJornada}`,
      detalhe3: pessoa.interesse,
      insignias: pessoa.insignias || [],
      icone: pessoa.icone,
      tipo,
      sabores: saboresTop3(pessoa.id)
    });
  }

  function enviarRecompensa() {
    if (!perfilVisitado) return;
    if (!recompensaEnvio.descricao.trim()) {
      setStatusRecompensa("Defina o premio antes de enviar.");
      return;
    }

    const registro = {
      destino: perfilVisitado.nome,
      tipoDestino: perfilVisitado.tipo,
      tipoRecompensa: recompensaEnvio.tipo,
      descricao: recompensaEnvio.descricao,
      observacao: recompensaEnvio.observacao,
      data: new Date().toISOString()
    };
    const salvos = JSON.parse(localStorage.getItem("recompensasGestor") || "[]");
    localStorage.setItem("recompensasGestor", JSON.stringify([registro, ...salvos]));
    setStatusRecompensa("Recompensa enviada ao Correio Viajante.");
    setRecompensaEnvio({ tipo: "icone", descricao: "", observacao: "" });
  }

  return (
    <Tela>
      <Topo>
        <div>
          <span>Livro de Registros</span>
          <h1>{isColaborador ? "Colaboradores The Garage" : "Outros Viajantes"}</h1>
          <p>
            {isColaborador
              ? "Visual rapido da equipe colaboradora por funcao e unidade."
              : "Visual rapido de outros viajantes ja registrados no app."}
          </p>
        </div>
        <HomeButton onClick={() => navigate("/perfil")} aria-label="Voltar ao perfil">
          <ion-icon name="home-outline"></ion-icon>
        </HomeButton>
      </Topo>

      {(isColaborador || isGestor) ? (
        agrupado.map((grupo) => (
          <BlocoFuncao key={grupo.funcao}>
            <CabecalhoFuncao>
              <h2>{grupo.funcao}</h2>
              <small>{countMembros(grupo.unidades)} pessoas</small>
            </CabecalhoFuncao>
            <GridUnidades>
              {grupo.unidades.map((unidade) => (
                <CardUnidade key={`${grupo.funcao}-${unidade.unidade}`}>
                  <header>
                    <span>{unidade.unidade}</span>
                    <Badge>{unidade.membros.length} membros</Badge>
                  </header>
                  <ListaMembros>
                    {unidade.membros.length === 0 ? (
                      <Vazio>Nenhum cadastro por aqui ainda.</Vazio>
                    ) : (
                      unidade.membros.map((membro) => (
                        <LinhaMembro
                          key={membro.id}
                          $clicavel
                          onClick={() => abrirPerfilResumido(membro, "colaborador")}
                        >
                          <Avatar>
                            {imagens?.[membro.icone] ? (
                              <img
                                src={imagens[membro.icone]}
                                alt={`${membro.nome} avatar`}
                              />
                            ) : (
                              <abbr title={membro.nome}>
                                {membro.nome.slice(0, 2).toUpperCase()}
                              </abbr>
                            )}
                          </Avatar>
                          <Info>
                            <strong>{membro.nome}</strong>
                            <span>{membro.turno} | {membro.tempoCasa}</span>
                            <small>{membro.foco}</small>
                          </Info>
                        </LinhaMembro>
                      ))
                    )}
                  </ListaMembros>
                </CardUnidade>
              ))}
            </GridUnidades>
          </BlocoFuncao>
        ))
      ) : null}
      {(!isColaborador || isGestor) ? (
        <BlocoFuncao>
          <CabecalhoFuncao>
            <h2>Comunidade de viajantes</h2>
            <small>{viajantesMockados.length} pessoas</small>
          </CabecalhoFuncao>
          <GridUnidades>
            {viajantesMockados.map((viajante) => (
              <CardUnidade key={viajante.id}>
                <LinhaMembro
                  $clicavel
                  onClick={() => abrirPerfilResumido(viajante, "viajante")}
                >
                  <Avatar>
                    {imagens?.[viajante.icone] ? (
                      <img
                        src={imagens[viajante.icone]}
                        alt={`${viajante.nome} avatar`}
                      />
                    ) : (
                      <abbr title={viajante.nome}>
                        {viajante.nome.slice(0, 2).toUpperCase()}
                      </abbr>
                    )}
                  </Avatar>
                  <Info>
                    <strong>{viajante.nome}</strong>
                    <span>{viajante.cidade} | {viajante.tempoJornada}</span>
                    <small>{viajante.interesse}</small>
                  </Info>
                </LinhaMembro>
              </CardUnidade>
            ))}
          </GridUnidades>
        </BlocoFuncao>
      ) : null}
      {perfilVisitado && (
        <ModalOverlay onClick={() => setPerfilVisitado(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <TopoPerfil>
              <AvatarGrande>
                {imagens?.[perfilVisitado.icone] ? (
                  <img
                    src={imagens[perfilVisitado.icone]}
                    alt={`${perfilVisitado.nome} avatar`}
                  />
                ) : (
                  <abbr title={perfilVisitado.nome}>
                    {perfilVisitado.nome.slice(0, 2).toUpperCase()}
                  </abbr>
                )}
              </AvatarGrande>
              <div>
                <h3>{perfilVisitado.nome}</h3>
                <span>{perfilVisitado.titulo}</span>
              </div>
            </TopoPerfil>

            <InfoLista>
              <li>{perfilVisitado.detalhe1}</li>
              <li>{perfilVisitado.detalhe2}</li>
            </InfoLista>

            {perfilVisitado.insignias && perfilVisitado.insignias.length > 0 ? (
              <>
                <h4>Insignias conquistadas</h4>
                <Insignias>
                  {perfilVisitado.insignias.map((insignia) => (
                    <span key={insignia}>{insignia}</span>
                  ))}
                </Insignias>
              </>
            ) : null}

            <h4>Top 3 sabores favoritos / mais pedidos</h4>
            <RankingSabores>
              {perfilVisitado.sabores.map((sabor, idx) => (
                <RankItem key={sabor}>
                  <RankPosicao>{idx + 1}º</RankPosicao>
                  <span>{sabor}</span>
                </RankItem>
              ))}
            </RankingSabores>
            {isGestor ? (
              <GestorRewardBox>
                <h4>Enviar recompensa pelo Correio Viajante</h4>
                <label>
                  Tipo de premio
                  <select
                    value={recompensaEnvio.tipo}
                    onChange={(e) =>
                      setRecompensaEnvio((prev) => ({ ...prev, tipo: e.target.value }))
                    }
                  >
                    <option value="icone">Cosmetico: novo icone</option>
                    <option value="titulo">Cosmetico: novo titulo</option>
                    <option value="insignia">Cosmetico: insignia</option>
                    <option value="desconto">Premio fisico: desconto</option>
                    <option value="bonus">Premio fisico: bonus</option>
                    <option value="outro">Premio fisico: outro</option>
                  </select>
                </label>
                <label>
                  Premio
                  <input
                    type="text"
                    placeholder="Ex.: Titulo Guardiao do Forno"
                    value={recompensaEnvio.descricao}
                    onChange={(e) =>
                      setRecompensaEnvio((prev) => ({ ...prev, descricao: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Observacao (opcional)
                  <textarea
                    rows={2}
                    value={recompensaEnvio.observacao}
                    onChange={(e) =>
                      setRecompensaEnvio((prev) => ({ ...prev, observacao: e.target.value }))
                    }
                  />
                </label>
                <button type="button" onClick={enviarRecompensa}>
                  Enviar recompensa
                </button>
                {statusRecompensa ? <small>{statusRecompensa}</small> : null}
              </GestorRewardBox>
            ) : null}
          </ModalCard>
        </ModalOverlay>
      )}
    </Tela>
  );
}

function countMembros(unidadesAgrupadas) {
  return unidadesAgrupadas.reduce((acc, item) => acc + item.membros.length, 0);
}

const Tela = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Topo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  span {
    color: #f2784a;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 12px;
  }
  h1 {
    margin: 4px 0;
    font-size: 26px;
  }
  p {
    margin: 0 auto;
    color: #bfbfbf;
    max-width: 640px;
  }
`;

const BlocoFuncao = styled.section`
  margin-top: 22px;
  background-color: #2f2f2f;
  border-radius: 18px;
  padding: 16px;
  box-sizing: border-box;
`;

const CabecalhoFuncao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  h2 {
    margin: 0;
    font-size: 20px;
  }
  small {
    color: #d3d3d3;
  }
`;

const GridUnidades = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
`;

const CardUnidade = styled.div`
  background-color: #242424;
  border-radius: 14px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #353535;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    span {
      font-weight: 700;
      letter-spacing: 0.03em;
    }
  }
`;

const Badge = styled.div`
  background-color: rgba(242, 120, 74, 0.12);
  color: #f2784a;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
`;

const ListaMembros = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LinhaMembro = styled.div`
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 10px;
  align-items: center;
  background-color: #2f2f2f;
  border-radius: 12px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #3a3a3a;
  cursor: ${(props) => (props.$clicavel ? "pointer" : "default")};
  transition: transform 0.12s ease, border-color 0.12s ease;
  &:hover {
    transform: ${(props) => (props.$clicavel ? "translateY(-1px)" : "none")};
    border-color: ${(props) => (props.$clicavel ? "#f2784a77" : "#3a3a3a")};
  }
`;

const Avatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #303030, #1f1f1f);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  abbr {
    color: #f5f5f5;
    text-decoration: none;
    font-weight: 700;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  strong {
    font-size: 16px;
  }
  span {
    color: #f2784a;
    font-size: 13px;
  }
  small {
    color: #d3d3d3;
    font-size: 12px;
  }
`;

const Vazio = styled.div`
  color: #bfbfbf;
  font-size: 13px;
  padding: 6px 0;
`;

const HomeButton = styled.button`
  margin-top: 2px;
  position: relative;
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
  align-self: center;
  z-index: 1;
  transition: background 0.2s ease, color 0.2s ease;
  ion-icon {
    font-size: 28px;
    position: relative;
    z-index: 2;
  }
  &:hover,
  &:active {
    background: #f2784a;
    color: #202020;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const ModalCard = styled.div`
  width: min(480px, 90vw);
  background: #2a2a2a;
  border: 1px solid #f2784a66;
  border-radius: 16px;
  padding: 22px;
  box-sizing: border-box;
  color: white;
  text-align: center;
  h4 {
    margin: 16px 0 10px 0;
    font-size: 17px;
  }
`;

const TopoPerfil = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  h3 {
    margin: 0;
    font-size: 22px;
  }
  span {
    color: #f2784a;
  }
`;

const AvatarGrande = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  background: #1f1f1f;
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
    font-weight: 700;
  }
`;

const InfoLista = styled.ul`
  margin: 16px 0 0 0;
  padding: 0;
  list-style: none;
  color: #d3d3d3;
  display: grid;
  gap: 8px;
  text-align: center;
  li {
    background: #242424;
    border: 1px solid #3a3a3a;
    border-radius: 10px;
    padding: 8px 10px;
  }
`;

const RankingSabores = styled.div`
  display: grid;
  gap: 8px;
`;

const RankItem = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  align-items: center;
  gap: 8px;
  background: #242424;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 8px 10px;
  span {
    text-align: left;
    color: #f5d9cc;
    font-size: 14px;
  }
`;

const RankPosicao = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(242, 120, 74, 0.2);
  border: 1px solid #f2784a88;
  color: #f2784a;
  font-weight: 700;
`;

const Insignias = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
  span {
    border: 1px solid #f2784a66;
    color: #ffd7c6;
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const GestorRewardBox = styled.div`
  margin-top: 14px;
  background: #242424;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 8px;
  text-align: left;
  label {
    display: grid;
    gap: 4px;
    color: #d3d3d3;
    font-size: 13px;
  }
  select,
  input,
  textarea {
    background: #1f1f1f;
    border: 1px solid #414141;
    border-radius: 10px;
    color: white;
    padding: 8px;
  }
  button {
    height: 36px;
    border: 0;
    border-radius: 10px;
    background: #f2784a;
    color: #202020;
    font-weight: 700;
    cursor: pointer;
  }
  small {
    color: #ffcfb8;
    font-weight: 600;
  }
`;
