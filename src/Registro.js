import styled, { keyframes } from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegistroUsuario, postLoginUsuario } from "./api";
import { signUp } from "./services/auth";
import banana from "./imagens/Banana_Levada.jpg";
import cabeca from "./imagens/Cabeca_de_Cogumelo.jpg";
import dente from "./imagens/Dente_de_Alho.jpg";
import morango from "./imagens/Morango_Bundinha.jpg";
import queixada from "./imagens/Queixada_Pepper.jpg";
import tomato from "./imagens/Tomato_Tomate.jpg";

const funcoes = ["Alquimista", "Mensageiro", "Entregas", "Gestao"];
const BASE_UNLOCKED_ICONS = [1, 2, 3, 4, 5, 6];
const initialIcons = [banana, cabeca, dente, morango, queixada, tomato];
const GIFT_ICON_MIN = 7;
const GIFT_ICON_MAX = 92;

function sortearIconePresente() {
  return (
    Math.floor(Math.random() * (GIFT_ICON_MAX - GIFT_ICON_MIN + 1)) +
    GIFT_ICON_MIN
  );
}

function montarDesbloqueados(iconePresente) {
  return Array.from(new Set([...BASE_UNLOCKED_ICONS, iconePresente]));
}

function tituloInicialPorTipo(tipoCadastro) {
  return tipoCadastro === "colaborador"
    ? "Aprendiz de Alquimista"
    : "Viajante Novato";
}

function montarCorreioBoasVindas(tipoCadastro) {
  return [
    {
      id: `boas-vindas-${Date.now()}`,
      titulo: "Saudacoes, viajante!",
      autor: "Correio da The Garage",
      corpo:
        tipoCadastro === "colaborador"
          ? "Seu acesso foi ativado. Abra a janela de icones no perfil para revelar seu presente surpresa."
          : "Sua jornada comecou. Abra a janela de icones no perfil para revelar seu presente surpresa.",
      data: new Date().toISOString().split("T")[0],
      recompensa: "Icone surpresa de perfil (?)",
      prioridade: "Alta"
    }
  ];
}

export default function Registro({ context }) {
  const navigate = useNavigate();
  const { setUsuario, setRememberMe } = context || {};

  const [tipoCadastro, setTipoCadastro] = useState("viajante");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState(false);
  const [senhosa, setSenhosa] = useState("password");
  const [funcao, setFuncao] = useState(funcoes[0]);
  const [iconeInicial, setIconeInicial] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const tituloCadastro = useMemo(
    () => (tipoCadastro === "colaborador" ? "Registro de Colaborador" : "Registro de Viajante"),
    [tipoCadastro]
  );

  function mostrarAviso() {
    setAviso((atual) => !atual);
  }

  function mostrarSenha() {
    setSenhosa((atual) => (atual === "password" ? "text" : "password"));
  }

  function criarPerfilLocal(iconeInicialEscolhido, iconePresente, funcaoFinal) {
    const desbloqueados = montarDesbloqueados(iconePresente);
    const tituloInicial = tituloInicialPorTipo(tipoCadastro);
    const perfilMock = {
      nome,
      email,
      icone: iconeInicialEscolhido,
      iconesDesbloqueados: desbloqueados,
      iconeRecompensaPendente: iconePresente,
      correioBoasVindas: montarCorreioBoasVindas(tipoCadastro),
      nivel: 1,
      pontos: 0,
      titulo: tituloInicial,
      titulosDesbloqueados: [tituloInicial],
      titulosPendentes: [],
      moedas: 20,
      skills: [],
      badges: [
        {
          nome: "Inicio da jornada",
          descricao: "Ganhou sua primeira insignia ao se registrar."
        }
      ],
      timeline: [
        {
          data: new Date().toISOString().split("T")[0],
          evento: "Chegada ao Universo The Garage"
        }
      ],
      reconhecimentos: 0,
      funcao: funcaoFinal,
      tipoCadastro
    };

    if (setRememberMe) setRememberMe(true);
    if (setUsuario) setUsuario(perfilMock);
    localStorage.setItem("usuario", JSON.stringify(perfilMock));

    alert("Cadastro concluido! Abra seu perfil para ver o presente surpresa.");
    navigate("/perfil");
  }

  async function registrar() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      alert("Preencha nome, e-mail e senha para continuar.");
      return;
    }

    const iconeInicialEscolhido = iconeInicial;
    const iconePresente = sortearIconePresente();
    const funcaoFinal = tipoCadastro === "colaborador" ? funcao : "Viajante";

    setCarregando(true);
    try {
      try {
        await signUp(email, senha, nome);
      } catch (supabaseErro) {
        // Continua mesmo quando o signUp externo falha para nao bloquear ambiente local.
        console.error(supabaseErro.message);
      }

      await postRegistroUsuario(
        nome,
        email,
        senha,
        iconeInicialEscolhido,
        funcaoFinal
      );

      if (setRememberMe) setRememberMe(true);

      try {
        const res = await postLoginUsuario(nome, senha);
        const user = res.data || {};
        const userComPresente = {
          ...user,
          nome: user.nome || nome,
          email: user.email || email,
          icone: user.icone || iconeInicialEscolhido,
          iconesDesbloqueados:
            user.iconesDesbloqueados && user.iconesDesbloqueados.length
              ? user.iconesDesbloqueados
              : montarDesbloqueados(iconePresente),
          iconeRecompensaPendente:
            user.iconeRecompensaPendente || iconePresente,
          correioBoasVindas:
            user.correioBoasVindas && user.correioBoasVindas.length
              ? user.correioBoasVindas
              : montarCorreioBoasVindas(tipoCadastro),
          titulo: user.titulo || tituloInicialPorTipo(tipoCadastro),
          titulosDesbloqueados:
            user.titulosDesbloqueados && user.titulosDesbloqueados.length
              ? user.titulosDesbloqueados
              : [tituloInicialPorTipo(tipoCadastro)],
          titulosPendentes:
            user.titulosPendentes && user.titulosPendentes.length
              ? user.titulosPendentes
              : [],
          funcao: user.funcao || funcaoFinal,
          tipoCadastro: user.tipoCadastro || tipoCadastro
        };

        if (setUsuario) setUsuario(userComPresente);
        localStorage.setItem("usuario", JSON.stringify(userComPresente));
      } catch (erroLogin) {
        console.error(erroLogin);
        criarPerfilLocal(iconeInicialEscolhido, iconePresente, funcaoFinal);
        return;
      }

      alert("Cadastro concluido! Abra seu perfil para ver o presente surpresa.");
      navigate("/perfil");
    } catch (erroCadastro) {
      console.error(erroCadastro);
      criarPerfilLocal(iconeInicialEscolhido, iconePresente, funcaoFinal);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Tudo>
      <GlowBackground aria-hidden="true" />
      <Tabua>
        <Saida onClick={() => navigate("/")}>X</Saida>

        <HeaderArea>
          <Subtitulo>Escolha seu portal</Subtitulo>
          <Titulo>{tituloCadastro}</Titulo>
        </HeaderArea>

        <TipoSwitcher>
          <TipoButton
            type="button"
            selecionado={tipoCadastro === "viajante"}
            onClick={() => setTipoCadastro("viajante")}
          >
            Viajante
          </TipoButton>
          <TipoButton
            type="button"
            selecionado={tipoCadastro === "colaborador"}
            onClick={() => setTipoCadastro("colaborador")}
          >
            Colaborador
          </TipoButton>
        </TipoSwitcher>

        <FormGrid>
          <FieldGroup>
            <label>Nome fantasia / apelido</label>
            <input
              type="text"
              placeholder="Ex.: Aurora"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <label>E-mail</label>
            <Caixa1>
              <Viz2 onClick={mostrarAviso}>(?)</Viz2>
              <Aviso amostra={aviso}>
                <Balao>
                  O e-mail sera usado para recuperar o acesso quando necessario.
                </Balao>
                <Indicacao />
              </Aviso>
              <input
                type="email"
                placeholder="voce@thegarage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Caixa1>
          </FieldGroup>

          <FieldGroup>
            <label>Senha</label>
            <Caixa1>
              <input
                type={senhosa}
                placeholder="Crie sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Viz onClick={mostrarSenha}>
                {senhosa === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Viz>
            </Caixa1>
          </FieldGroup>

          {tipoCadastro === "colaborador" && (
            <FuncoesWrapper>
              <FuncaoTitulo>Funcao na The Garage</FuncaoTitulo>
              <FuncoesLista>
                {funcoes.map((opcao) => (
                  <FuncaoButton
                    key={opcao}
                    selecionado={funcao === opcao}
                    onClick={() => setFuncao(opcao)}
                    type="button"
                  >
                    {opcao}
                  </FuncaoButton>
                ))}
              </FuncoesLista>
            </FuncoesWrapper>
          )}

          <FieldGroup>
            <label>Escolha seu icone inicial</label>
            <IconesIniciais>
              {initialIcons.map((src, idx) => {
                const idIcone = idx + 1;
                return (
                  <IconeInicialButton
                    key={idIcone}
                    type="button"
                    selecionado={iconeInicial === idIcone}
                    onClick={() => setIconeInicial(idIcone)}
                  >
                    <img src={src} alt={`icone inicial ${idIcone}`} />
                  </IconeInicialButton>
                );
              })}
            </IconesIniciais>
          </FieldGroup>
        </FormGrid>

        <PresenteCard>
          <h3>Presente de chegada</h3>
          <p>
            Voce escolhe seu icone inicial entre os seis basicos e recebe mais
            um icone surpresa aleatorio como recompensa.
          </p>
        </PresenteCard>

        <ButtonArea>
          <MensagemFinal>
            {tipoCadastro === "colaborador"
              ? "Boas vindas ao time The Garage!"
              : "Boa jornada, viajante!"}
          </MensagemFinal>
          <Sombra>
            <Sombra2>
              <Sombra3>
                <button type="button" onClick={registrar} disabled={carregando}>
                  {carregando ? "Registrando..." : "Entrar"}
                </button>
              </Sombra3>
            </Sombra2>
          </Sombra>
        </ButtonArea>
      </Tabua>
    </Tudo>
  );
}

const GlowBackground = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(242, 120, 74, 0.22), transparent 42%),
    radial-gradient(circle at 85% 15%, rgba(106, 168, 255, 0.18), transparent 36%),
    linear-gradient(145deg, #161616, #202020 45%, #141414);
  pointer-events: none;
`;

const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`;

const Subtitulo = styled.span`
  color: #f5f5f5;
  font-size: 12px;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  opacity: 0.72;
`;

const Titulo = styled.h1`
  margin: 0;
  color: white;
  font-size: clamp(27px, 3vw, 36px);
  line-height: 1.1;
`;

const Saida = styled.button`
  height: 42px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 22px;
  font-weight: 700;
  position: absolute;
  right: 18px;
  top: 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
`;

const Tabua = styled.div`
  position: relative;
  width: min(980px, 92vw);
  min-height: min(760px, 92vh);
  border-radius: 30px;
  background: rgba(39, 39, 39, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: clamp(28px, 3.2vw, 40px);
  box-sizing: border-box;
  z-index: 1;

  @media (min-width: 920px) {
    grid-template-columns: 1.15fr 0.85fr;
    grid-template-areas:
      "header switch"
      "form present"
      "form button";
    column-gap: 30px;
    row-gap: 18px;
  }
`;

const TipoSwitcher = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 4px;
  gap: 4px;

  @media (min-width: 920px) {
    grid-area: switch;
    align-self: start;
    margin-top: 10px;
  }
`;

const TipoButton = styled.button`
  border: 0;
  border-radius: 10px;
  height: 40px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  background: ${(props) =>
    props.selecionado ? "linear-gradient(120deg, #f2784a, #ff9d73)" : "transparent"};
  color: ${(props) => (props.selecionado ? "#1e1e1e" : "#fff")};
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 12px;

  @media (min-width: 920px) {
    grid-area: form;
    align-content: start;
  }
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 6px;

  label {
    color: #d7d7d7;
    font-size: 13px;
    letter-spacing: 0.02em;
  }
`;

const IconesIniciais = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(52px, 1fr));
  gap: 8px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(3, minmax(52px, 1fr));
  }
`;

const IconeInicialButton = styled.button`
  border: ${(props) =>
    props.selecionado ? "2px solid #f2784a" : "2px solid #4c4c4c"};
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  cursor: pointer;
  height: 62px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease, border-color 0.12s ease;

  img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: #f2784a;
  }
`;

const Aviso = styled.div`
  position: absolute;
  display: ${(props) => (props.amostra ? "block" : "none")};
  top: -132px;
  right: 56px;
  width: 250px;
  z-index: 2;
`;

const Indicacao = styled.div`
  position: absolute;
  right: 6px;
  top: 86px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 20px solid #fff;
`;

const Balao = styled.div`
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.4;
  padding: 12px;
  box-sizing: border-box;
  position: absolute;
  width: 220px;
  background-color: white;
  color: #202020;
`;

const Caixa1 = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    margin: 0;
  }
`;

const Viz = styled.div`
  position: absolute;
  right: 16px;
  font-size: 22px;
  top: 10px;
  width: 24px;
  height: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.75;
`;

const Viz2 = styled.div`
  position: absolute;
  right: 14px;
  top: 11px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
`;

const FuncoesWrapper = styled.div`
  width: 100%;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
`;

const FuncaoTitulo = styled.h2`
  margin: 0 0 8px 0;
  font-weight: 500;
  font-size: 14px;
  color: white;
`;

const FuncoesLista = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const FuncaoButton = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: ${(props) => (props.selecionado ? "2px solid #e87c3a" : "2px solid #8a8a8a")};
  background-color: ${(props) =>
    props.selecionado ? "rgba(232, 124, 58, 0.2)" : "rgba(255, 255, 255, 0.03)"};
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
`;

const PresenteCard = styled.section`
  background: linear-gradient(150deg, rgba(242, 120, 74, 0.2), rgba(29, 29, 29, 0.88));
  border: 1px solid rgba(242, 120, 74, 0.38);
  border-radius: 18px;
  padding: 18px;
  align-self: start;

  h3 {
    margin: 0 0 8px 0;
    color: #ffc7ad;
    font-size: 17px;
  }

  p {
    margin: 0;
    color: #f1f1f1;
    line-height: 1.55;
    font-size: 14px;
  }

  @media (min-width: 920px) {
    grid-area: present;
  }
`;

const portalPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(232, 124, 58, 0.35), 0 0 0 0 rgba(255, 255, 255, 0.12);
    transform: translateY(0) scale(1);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(232, 124, 58, 0), 0 0 0 18px rgba(255, 255, 255, 0);
    transform: translateY(-1px) scale(1.02);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(232, 124, 58, 0);
    transform: translateY(0) scale(1);
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;

  @media (min-width: 920px) {
    grid-area: button;
    align-self: end;
  }
`;

const MensagemFinal = styled.p`
  margin: 0;
  color: #d3d3d3;
  font-size: 14px;
  font-weight: 500;
`;

const Sombra = styled.div`
  box-shadow: -4px -4px 8px rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    height: 44px;
    background-color: white;
    color: #202020;
    font-size: 18px;
    font-weight: 700;
    border-radius: 20px;
    border: 0;
    box-shadow: 4px 4px 8px rgba(255, 255, 255, 0.12);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  button:hover {
    animation: ${portalPulse} 1.2s ease-in-out infinite;
  }

  button:active {
    transform: translateY(1px);
  }

  button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    animation: none;
  }
`;

const Sombra2 = styled.div`
  box-shadow: 4px -4px 8px rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
`;

const Sombra3 = styled.div`
  box-shadow: -4px 4px 8px rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
`;

const Tudo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 24px;

  input {
    width: 100%;
    min-height: 44px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.04);
    font-size: 16px;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.24);
    color: white;
    padding: 0 42px 0 12px;
    box-sizing: border-box;
  }

  input:focus {
    outline: 2px solid rgba(242, 120, 74, 0.5);
    border-color: rgba(242, 120, 74, 0.85);
  }

  input::placeholder {
    color: #b6b6b6;
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;
