import styled from "styled-components";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import banana from "./imagens/Banana_Levada.jpg";
import cabeca from "./imagens/Cabeca_de_Cogumelo.jpg";
import dente from "./imagens/Dente_de_Alho.jpg";
import morango from "./imagens/Morango_Bundinha.jpg";
import queixada from "./imagens/Queixada_Pepper.jpg";
import tomato from "./imagens/Tomato_Tomate.jpg";

const baseIcons = [banana, cabeca, dente, morango, queixada, tomato];
const lockedIcons = Array.from({ length: 86 }, (_, i) => {
  try {
    return require(`./imagens/Icone${i + 1}.JPG`);
  } catch (e) {
    return null;
  }
}).filter(Boolean);
const iconList = [
  ...baseIcons.map((src) => ({ src, locked: false })),
  ...lockedIcons.map((src) => ({ src, locked: true }))
];
const badgeEmoji = "\u{1F97E}";
const TITULOS_CATALOGO = [
  "Viajante Novato",
  "Aprendiz de Alquimista",
  "Explorador",
  "Guardiao da Massa",
  "Mensageiro da Aurora",
  "Alquimista de Campo",
  "Guardiao de Dados"
];

export default function Usuario({ context }) {
  const navigate = useNavigate();
  const { usuario, setUsuario, setRememberMe, correio } = context;
  const [activeBadge, setActiveBadge] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showTitlePicker, setShowTitlePicker] = useState(false);

  const {
    nome,
    titulo,
    nivel = 1,
    pontos = 0,
    icone,
    iconesDesbloqueados = [1, 2, 3, 4, 5, 6],
    iconeRecompensaPendente = null,
    titulosDesbloqueados,
    titulosPendentes = [],
    skills = [],
    timeline = [],
    badges = []
  } = usuario;

  const iconesLiberados = useMemo(
    () => new Set(iconesDesbloqueados),
    [iconesDesbloqueados]
  );

  const xpPorNivel = 600;
  const progresso = Math.min(100, ((pontos || 0) / xpPorNivel) * 100);

  const badgesList =
    badges && badges.length
      ? badges
      : [
          {
            nome: "Inicio da jornada",
            descricao: "Ganhou sua primeira insignia ao se registrar."
          }
        ];

  const tituloInicialPadrao =
    usuario?.tipoCadastro === "colaborador"
      ? "Aprendiz de Alquimista"
      : "Viajante Novato";
  const titulosLiberados = useMemo(
    () =>
      new Set(
        titulosDesbloqueados && titulosDesbloqueados.length
          ? titulosDesbloqueados
          : [tituloInicialPadrao]
      ),
    [titulosDesbloqueados, tituloInicialPadrao]
  );
  const isGestor =
    usuario?.funcao === "Gestao" || usuario?.funcao === "Gestor";

  const dataIngresso = useMemo(
    () =>
      timeline && timeline.length
        ? timeline[0].data
        : new Date().toISOString().split("T")[0],
    [timeline]
  );

  const timelineData = useMemo(
    () =>
      (timeline && timeline.length
        ? timeline
        : [{ data: dataIngresso, evento: "Ingresso na empresa" }]
      ).map((item) => ({
        ...item,
        evento:
          item.evento === "Chegada ao Garageverso"
            ? "Chegada ao Universo The Garage"
            : item.evento
      })),
    [timeline, dataIngresso]
  );
  const isColaborador =
    usuario?.tipoCadastro === "colaborador" ||
    ["Alquimista", "Mensageiro", "Entregas", "Gestao"].includes(usuario?.funcao);
  const mensagensNaoLidas =
    (correio?.naoLidas?.length || 0) + (usuario?.correioBoasVindas?.length || 0);

  function atualizarUsuario(dados) {
    if (!setUsuario) return;
    setUsuario(dados);
  }

  function fecharSeletorIcones() {
    setShowIconPicker(false);
  }

  function removerMarcacaoRecompensa() {
    if (!iconeRecompensaPendente) return;
    atualizarUsuario({ ...usuario, iconeRecompensaPendente: null });
  }

  function selecionarIcone(idIcone) {
    const atualizacao = {
      ...usuario,
      icone: idIcone,
      iconeRecompensaPendente: null
    };
    atualizarUsuario(atualizacao);
    fecharSeletorIcones();
  }

  function sair() {
    localStorage.removeItem("usuario");
    localStorage.setItem("rememberMe", "false");
    if (setRememberMe) setRememberMe(false);
    if (setUsuario) setUsuario(null);
    navigate("/");
  }

  return (
    <>
      <Tela>
        <ContentGrid>
          <MainColumn>
            <Perfil>
              <IconePerfil
                src={(iconList[(icone || 1) - 1] || iconList[0]).src}
                alt="icone viajante"
                onClick={() => setShowIconPicker(true)}
              />
              <section>
                <h1>{nome}</h1>
                <TituloPerfil onClick={() => setShowTitlePicker(true)}>
                  {titulo || tituloInicialPadrao}
                </TituloPerfil>
                <ExperienceRow>
                  <span>Nvl. {nivel || 1}</span>
                  <Barra>
                    <ColoridoCima width={progresso}>
                      <Colorido />
                    </ColoridoCima>
                    <PontinhaCima />
                  </Barra>
                  <strong>
                    {pontos || 0}/{xpPorNivel} XP
                  </strong>
                </ExperienceRow>
              </section>
            </Perfil>

            <AtalhosSection>
              <h4>Portais principais</h4>
              <AtalhosGrid>
                <AtalhoCard onClick={() => navigate("/correio")}>
                  <ion-icon name="mail-unread-outline"></ion-icon>
                  <strong>Correio Viajante</strong>
                  <small>{mensagensNaoLidas} nao lidas</small>
                  {mensagensNaoLidas > 0 ? <Ping aria-hidden="true" /> : null}
                </AtalhoCard>
                <AtalhoCard onClick={() => navigate("/livro-registro")}>
                  <ion-icon name="people-outline"></ion-icon>
                  <strong>Livro de Registros</strong>
                  <small>
                    {isColaborador ? "Equipe colaboradora" : "Outros viajantes"}
                  </small>
                </AtalhoCard>
                {isGestor ? (
                  <AtalhoCard onClick={() => navigate("/painel")}>
                    <ion-icon name="analytics-outline"></ion-icon>
                    <strong>Analise de dados</strong>
                    <small>Feedbacks e gestao de recompensas</small>
                  </AtalhoCard>
                ) : null}
              </AtalhosGrid>
              <SairButton type="button" onClick={sair}>
                <ion-icon name="power-outline"></ion-icon> Sair
              </SairButton>
            </AtalhosSection>

            <Section>
              <h4>Skills marcadas</h4>
              {skills.length === 0 ? (
                <EmptyText>Conquiste habilidades com o tempo!</EmptyText>
              ) : (
                <SkillGrid>
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </SkillGrid>
              )}
            </Section>
          </MainColumn>

          <AsideColumn>
            <Section>
              <h4>Linha do tempo</h4>
              <TimelineNote>
                Baseada na data de ingresso na empresa: {dataIngresso}
              </TimelineNote>
              <Timeline>
                {timelineData.map((item) => (
                  <li key={item.data + item.evento}>
                    <strong>{item.data}</strong>
                    <p>{item.evento}</p>
                  </li>
                ))}
              </Timeline>
            </Section>

            <Section>
              <h4>Insignias</h4>
              <BadgeGrid>
                {badgesList.map((badge, idx) => (
                  <BadgeItem
                    key={badge.nome}
                    onMouseEnter={() => setActiveBadge(idx)}
                    onMouseLeave={() => setActiveBadge(null)}
                  >
                    <BadgeButton
                      onClick={() =>
                        setActiveBadge((prev) => (prev === idx ? null : idx))
                      }
                      aria-label={badge.nome}
                    >
                      <span aria-hidden="true">{badgeEmoji}</span>
                    </BadgeButton>
                    <BadgeTooltip visible={activeBadge === idx}>
                      <strong>{badge.nome}</strong>
                      <small>{badge.descricao}</small>
                    </BadgeTooltip>
                  </BadgeItem>
                ))}
              </BadgeGrid>
            </Section>
          </AsideColumn>
        </ContentGrid>
      </Tela>

      {showIconPicker && (
        <ModalOverlay onClick={fecharSeletorIcones}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h4>Escolha seu icone</h4>
            {iconeRecompensaPendente ? (
              <RewardHint>
                Voce recebeu um novo icone surpresa. Procure o marcador <strong>!</strong>.
              </RewardHint>
            ) : null}
            <IconGrid>
              {iconList.map((iconItem, idx) => {
                const idIcone = idx + 1;
                const selected = icone === idIcone;
                const bloqueado =
                  iconItem.locked && !iconesLiberados.has(idIcone);
                const ehRecompensa = idIcone === iconeRecompensaPendente;

                return (
                  <IconeOption
                    key={idIcone}
                    selecionado={selected}
                    bloqueado={bloqueado}
                    onClick={() => {
                      if (bloqueado) return;
                      selecionarIcone(idIcone);
                    }}
                  >
                    <img src={iconItem.src} alt={`icone ${idIcone}`} />
                    {bloqueado && <LockBadge aria-hidden="true">L</LockBadge>}
                    {ehRecompensa ? (
                      <RewardBadge
                        type="button"
                        aria-label="Remover marcador de novo icone"
                        onClick={(e) => {
                          e.stopPropagation();
                          removerMarcacaoRecompensa();
                        }}
                      >
                        !
                      </RewardBadge>
                    ) : null}
                  </IconeOption>
                );
              })}
            </IconGrid>
          </ModalCard>
        </ModalOverlay>
      )}

      {showTitlePicker && (
        <ModalOverlay onClick={() => setShowTitlePicker(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h4>Escolha seu titulo</h4>
            <TituloLista>
              {TITULOS_CATALOGO.map((t) => {
                const bloqueado = !titulosLiberados.has(t);
                const pendente = titulosPendentes.includes(t);
                return (
                <TituloOption
                  key={t}
                  selecionado={(titulo || tituloInicialPadrao) === t}
                  bloqueado={bloqueado}
                  onClick={() => {
                    if (bloqueado) return;
                    atualizarUsuario({
                      ...usuario,
                      titulo: t,
                      titulosPendentes: titulosPendentes.filter((item) => item !== t)
                    });
                    setShowTitlePicker(false);
                  }}
                >
                  {t}
                  {bloqueado ? " (Bloqueado)" : ""}
                  {pendente ? " !" : ""}
                </TituloOption>
                );
              })}
            </TituloLista>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}

const Tela = styled.div`
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 15%, rgba(242, 120, 74, 0.1), transparent 40%),
    #202020;
  color: white;
  box-sizing: border-box;
  padding: clamp(14px, 2vw, 24px) clamp(12px, 2.2vw, 26px) 90px;
  overflow-y: auto;
`;

const ContentGrid = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 14px;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const MainColumn = styled.div`
  display: grid;
  gap: 14px;
`;

const AsideColumn = styled.div`
  display: grid;
  gap: 14px;
`;

const Perfil = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #2f2f2f;
  border-radius: 20px;
  padding: 18px;
  box-sizing: border-box;
  border: 1px solid #3f3f3f;

  img {
    height: 128px;
    border-radius: 16px;
    margin-right: 16px;
  }

  section {
    flex: 1;
  }

  h1 {
    margin: 0;
    font-size: clamp(24px, 3.2vw, 32px);
  }

  @media (max-width: 620px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;

    img {
      margin-right: 0;
    }
  }
`;

const Section = styled.section`
  width: 100%;
  background: #2b2b2b;
  border: 1px solid #3a3a3a;
  border-radius: 18px;
  padding: 16px;
  box-sizing: border-box;

  h4 {
    margin: 0 0 12px 0;
  }
`;

const AtalhosSection = styled.section`
  width: 100%;
  background: #2b2b2b;
  border: 1px solid #3a3a3a;
  border-radius: 18px;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  h4 {
    margin: 0;
  }
`;

const AtalhosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
`;

const AtalhoCard = styled.button`
  position: relative;
  border: 1px solid #404040;
  border-radius: 14px;
  background: #242424;
  color: white;
  text-align: left;
  padding: 12px;
  cursor: pointer;
  display: grid;
  gap: 4px;
  ion-icon {
    color: #f2784a;
    font-size: 24px;
  }
  strong {
    font-size: 15px;
  }
  small {
    color: #d3d3d3;
  }
`;

const Ping = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f2784a;
  box-shadow: 0 0 0 6px rgba(242, 120, 74, 0.2);
`;

const SairButton = styled.button`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  border: 2px solid #f2784a;
  background: transparent;
  color: #f2784a;
  font-weight: 700;
  cursor: pointer;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    border: 1px solid #f2784a;
    border-radius: 999px;
    padding: 6px 12px;
  }
`;

const EmptyText = styled.p`
  margin: 4px 0 0 0;
  color: #d3d3d3;
`;

const TimelineNote = styled.p`
  margin: 0 0 10px 0;
  color: #bfbfbf;
  font-size: 14px;
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    border-left: 2px solid #f2784a;
    padding: 10px 0 10px 12px;
    margin-bottom: 6px;
  }

  strong {
    display: block;
    color: #f2784a;
  }

  p {
    margin: 4px 0 0 0;
  }
`;

const BadgeGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const BadgeItem = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const BadgeButton = styled.button`
  background: #2f2f2f;
  border: 2px solid #f2784a;
  border-radius: 14px;
  padding: 10px;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;

  span {
    font-size: 36px;
    line-height: 1;
  }

  &:hover {
    background: #f2784a22;
    transform: translateY(-2px);
  }
`;

const BadgeTooltip = styled.div`
  position: absolute;
  top: 84px;
  left: 50%;
  transform: translateX(-50%);
  background: #2f2f2f;
  border: 1px solid #f2784a;
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 180px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transition: opacity 0.15s ease;
  z-index: 2;

  strong {
    display: block;
    color: #f2784a;
    margin-bottom: 4px;
  }

  small {
    color: #d3d3d3;
  }
`;

const Barra = styled.div`
  width: 100%;
  height: 18px;
  border: 2px solid #3f3f3f;
  border-radius: 12px;
  display: flex;
`;

const Colorido = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2784a;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const ColoridoCima = styled.div`
  background-color: #fcb48b;
  width: ${(props) => props.width}%;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const PontinhaCima = styled.div`
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-top: 20px solid #fcb48b;
`;

const ExperienceRow = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr 120px;
  align-items: center;
  gap: 10px;
  margin-top: 8px;

  span {
    color: #d3d3d3;
  }

  strong {
    color: #f2784a;
    justify-self: end;
    font-size: 14px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;

    strong {
      justify-self: center;
    }
  }
`;

const IconePerfil = styled.img`
  height: 128px;
  width: 128px;
  object-fit: cover;
  border-radius: 16px;
  cursor: pointer;
  border: 2px solid #f2784a33;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
    border: 2px solid #f2784a;
  }
`;

const TituloPerfil = styled.h3`
  margin: 4px 0;
  color: #f2784a;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    text-decoration: underline;
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
  background: #2f2f2f;
  border: 1px solid #f2784a;
  border-radius: 16px;
  padding: 18px;
  width: 90%;
  max-width: 460px;
  max-height: 82vh;
  overflow-y: auto;
  color: white;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);

  h4 {
    margin: 0 0 12px 0;
  }
`;

const RewardHint = styled.p`
  margin: 0 0 12px 0;
  background: rgba(242, 120, 74, 0.14);
  border: 1px solid rgba(242, 120, 74, 0.5);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 13px;
  color: #ffe7dc;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 4px;
`;

const IconeOption = styled.button`
  background: #202020;
  border: ${(props) =>
    props.selecionado ? "2px solid #f2784a" : "2px solid #4d4d4d"};
  border-radius: 12px;
  padding: 6px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.bloqueado ? "not-allowed" : "pointer")};
  transition: transform 0.15s ease, border 0.15s ease;
  position: relative;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
    filter: ${(props) =>
      props.bloqueado ? "grayscale(100%) brightness(0.7)" : "none"};
  }
`;

const LockBadge = styled.span`
  position: absolute;
  bottom: 6px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #f2784a;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const RewardBadge = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: #f2784a;
  color: #202020;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  border: 0;
  cursor: pointer;
`;

const TituloLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TituloOption = styled.button`
  background: #202020;
  border: ${(props) =>
    props.selecionado ? "2px solid #f2784a" : "2px solid #4d4d4d"};
  border-radius: 12px;
  padding: 10px 12px;
  color: ${(props) => (props.bloqueado ? "#9f9f9f" : "white")};
  cursor: ${(props) => (props.bloqueado ? "not-allowed" : "pointer")};
  text-align: left;
  opacity: ${(props) => (props.bloqueado ? 0.65 : 1)};
`;
