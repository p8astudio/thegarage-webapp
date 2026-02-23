/**
 * Conteudo das trilhas e tutoriais da TG.
 * Tipos TypeScript declarados em tutorialTypes.d.ts.
 */

/** @type {import("./tutorialTypes").TutorialTrack[]} */
export const TUTORIAL_TRACKS = [
  {
    id: "forja-operacao",
    titulo: "Rituais da Forja",
    descricao:
      "Abertura, mise en place e passagem de turno para quem cuida do calor da casa.",
    foco: "Forno e operacao",
    role: "Alquimistas",
    destaque: "Fluxo quente sem perder o lore.",
    duracaoEstimativa: "35-50 min",
    icone: "flame-outline",
    cor: "#f2784a"
  },
  {
    id: "mensagens-viajantes",
    titulo: "Mensagens aos Viajantes",
    descricao:
      "Atendimento encantado, uso do Correio Viajante e registro de feedbacks.",
    foco: "Atendimento e narrativa",
    role: "Mensageiros",
    destaque: "Cada encontro conta uma boa historia.",
    duracaoEstimativa: "25-40 min",
    icone: "chatbubble-ellipses-outline",
    cor: "#9ad0f5"
  },
  {
    id: "expedicoes",
    titulo: "Expedicoes e Entregas",
    descricao:
      "Checklist rapido, embalagens vivas e comunicacao com o viajante na rua.",
    foco: "Rotas e qualidade",
    role: "Entregas",
    destaque: "Chegar quente, inteiro e no tempo combinado.",
    duracaoEstimativa: "20-35 min",
    icone: "bicycle-outline",
    cor: "#9ef2a6"
  },
  {
    id: "gestao-turno",
    titulo: "Gestao da Tripulacao",
    descricao:
      "Planejamento do ciclo, rituais de feedback e leitura do clima da casa.",
    foco: "Lideranca e ritmo",
    role: "Gestao",
    destaque: "Time alinhado, clima em dia.",
    duracaoEstimativa: "30-45 min",
    icone: "sparkles-outline",
    cor: "#e5c16c"
  }
];

/** @type {import("./tutorialTypes").Tutorial[]} */
export const ALL_TUTORIALS = [
  {
    id: "abertura-forja",
    trackId: "forja-operacao",
    titulo: "Abertura da Forja",
    resumo: "Checklist narrativo para despertar o forno e a bancada.",
    role: "Alquimistas",
    badge: "Aprendiz do Fogo",
    tempoMinutos: 20,
    steps: [
      {
        id: "forno-check",
        titulo: "Despertar o forno",
        descricao:
          "Ligar, limpar a pedra e calibrar temperatura. Deixar termometro visivel."
      },
      {
        id: "mise-en-place",
        titulo: "Mise da massa viva",
        descricao:
          "Separar massas, molhos e toppings prioritarios. Conferir validade e temperatura."
      },
      {
        id: "ritual-equipe",
        titulo: "Ritual rapido de turno",
        descricao:
          "Alinhar picos esperados, papeis e sinais de clima da equipe."
      }
    ]
  },
  {
    id: "fluxo-forno",
    trackId: "forja-operacao",
    titulo: "Fluxo quente no pico",
    resumo: "Organizacao de fila, cortes e voz de comando no calor.",
    role: "Alquimistas",
    tempoMinutos: 15,
    steps: [
      {
        id: "fila-producao",
        titulo: "Mapa da fila",
        descricao:
          "Usar etiquetas ou tela para ordenar por tempo de forno e prioridade de cliente."
      },
      {
        id: "voz-de-comando",
        titulo: "Chamada de tempos",
        descricao:
          "Anunciar saida a cada 60s, avisar atrasos e pedir apoio com antecedencia."
      },
      {
        id: "entrega-balcao",
        titulo: "Entrega ao mensageiro",
        descricao:
          "Conferir corte, tampa e temperatura. Marcar quem leva para evitar extravio."
      }
    ]
  },
  {
    id: "fechamento-forja",
    trackId: "forja-operacao",
    titulo: "Fechamento da Forja",
    resumo: "Ritual para devolver a cozinha ao ponto zero.",
    role: "Alquimistas",
    badge: "Guardiao da Noite",
    tempoMinutos: 25,
    steps: [
      {
        id: "checklimpeza",
        titulo: "Checklist de limpeza",
        descricao:
          "Dividir bancadas por dono, conferir forno frio e limpar pedra com raspador."
      },
      {
        id: "estoque-critico",
        titulo: "Sinais para o laboratorio",
        descricao:
          "Registrar massas/toppings criticos no quadro ou app. Deixar etiquetas para o proximo ciclo."
      },
      {
        id: "passagem-turno",
        titulo: "Passagem para a madrugada",
        descricao:
          "Notas rapidas de incidentes, fotos do setup final e pendencias no Correio."
      }
    ]
  },
  {
    id: "saudacao-portal",
    trackId: "mensagens-viajantes",
    titulo: "Saudacao do Portal",
    resumo: "Roteiro para receber viajantes mantendo a narrativa TG.",
    role: "Mensageiros",
    tempoMinutos: 10,
    steps: [
      {
        id: "entrada",
        titulo: "Primeira palavra",
        descricao:
          "Usar saudacao-tema do dia e olhar nos olhos. Perguntar o nome do viajante."
      },
      {
        id: "curadoria",
        titulo: "Curadoria express",
        descricao:
          "Apresentar 1 opcao assinatura e 1 novidade. Conectar com clima da casa."
      },
      {
        id: "encerrar",
        titulo: "Encerrar encantando",
        descricao:
          "Confirmar nome no pedido, agradecer pela visita e indicar o mural de recados."
      }
    ]
  },
  {
    id: "correio-feedback",
    trackId: "mensagens-viajantes",
    titulo: "Correio Viajante",
    resumo: "Como registrar feedbacks e recados para a tripulacao.",
    role: "Mensageiros",
    tempoMinutos: 12,
    steps: [
      {
        id: "ouvir",
        titulo: "Capturar a historia",
        descricao:
          "Ouvir sem interromper, anotar nome e ponto principal. Pedir permissao para registrar."
      },
      {
        id: "registrar",
        titulo: "Lancar no Correio",
        descricao:
          "Registrar canal (loja/app), sentimento (azul/amarelo/vermelho) e time envolvido."
      },
      {
        id: "retorno",
        titulo: "Fechar o ciclo",
        descricao:
          "Compartilhar quem vai responder e ate quando. Se for elogio, disparar faisca."
      }
    ]
  },
  {
    id: "entrega-check",
    trackId: "expedicoes",
    titulo: "Checklist de expedicao",
    resumo: "Antes de sair, conferir embalagem, rota e contato.",
    role: "Entregas",
    tempoMinutos: 8,
    steps: [
      {
        id: "embalagem",
        titulo: "Embalagem viva",
        descricao:
          "Checar tampa, respiro e umidade. Adicionar mensagem curta ou selo do turno."
      },
      {
        id: "rota",
        titulo: "Rota segura",
        descricao:
          "Validar caminho sem buracos e evitar trechos com obras. Ajustar no app se precisar."
      },
      {
        id: "contato",
        titulo: "Contato com viajante",
        descricao:
          "Enviar tempo estimado e ponto de entrega. Confirmar nome para evitar trocas."
      }
    ]
  },
  {
    id: "entrega-fria",
    trackId: "expedicoes",
    titulo: "Entrega sem perder calor",
    resumo: "Tecnicas para manter temperatura e apresentacao no trajeto.",
    role: "Entregas",
    tempoMinutos: 10,
    steps: [
      {
        id: "camadas",
        titulo: "Organizar a mochila",
        descricao:
          "Produtos quentes separados dos frios, base reta e zero objetos soltos."
      },
      {
        id: "tempo",
        titulo: "Relatar atrasos",
        descricao:
          "Se passar de 5 min do previsto, avisar o mensageiro base para novo ETA."
      },
      {
        id: "checkin",
        titulo: "Entrega com ritual",
        descricao:
          "Confirmar nome, entregar com sorriso e reforcar o convite para avaliar a viagem."
      }
    ]
  },
  {
    id: "ritual-feedback",
    trackId: "gestao-turno",
    titulo: "Feedback rapido de turno",
    resumo: "Ritual em 10 min para alinhar clima e aprender junto.",
    role: "Gestao",
    tempoMinutos: 10,
    steps: [
      {
        id: "abrir",
        titulo: "Abrir com contexto",
        descricao:
          "Compartilhar meta do ciclo e sinal de clima (azul/amarelo/vermelho)."
      },
      {
        id: "ouvir-time",
        titulo: "Ouvir quem estava no front",
        descricao:
          "Pedir 1 ponto bom e 1 ponto de melhoria por pessoa. Anotar evidencias."
      },
      {
        id: "fechar",
        titulo: "Fechar com combinado",
        descricao:
          "Escolher 1 ajuste rapido e 1 acompanhamento para o proximo turno."
      }
    ]
  },
  {
    id: "passagem-turno-gestao",
    trackId: "gestao-turno",
    titulo: "Passagem de comando",
    resumo: "Checklist para entregar o turno para outra lideranca.",
    role: "Gestao",
    tempoMinutos: 15,
    steps: [
      {
        id: "numeros",
        titulo: "Numeros-chave",
        descricao:
          "Volume de pedidos, incidentes, SLA medio e estoque critico no final do ciclo."
      },
      {
        id: "pessoas",
        titulo: "Pessoas e clima",
        descricao:
          "Quem precisa de pausa, quem brilhou e alertas de tensao. Registrar faiscas necessarias."
      },
      {
        id: "proximos",
        titulo: "Proximos passos",
        descricao:
          "Pendencias, entregas de clientes importantes e teste de receita em andamento."
      }
    ]
  }
];
