export const tutorials = [
  {
    id: "abre-forja",
    titulo: "Abertura da Forja",
    tipo: "Operacao",
    resumo: "Checklist narrativo para abrir a loja mantendo o lore.",
    videoUrl: "",
    steps: [
      "Despertar o forno e calibrar temperatura.",
      "Atualizar o mural dos viajantes com novidades.",
      "Briefing rapido com a tripulacao do turno."
    ],
    quest: "Aprendiz do Fogo",
    pontos: 40,
    recorrencia: "Diaria"
  },
  {
    id: "voz-dos-viajantes",
    titulo: "Atendimento Encantado",
    tipo: "Cultura",
    resumo: "Roteiro para acolher clientes como viajantes do universo TG.",
    videoUrl: "",
    steps: [
      "Saudacao tematica na chegada.",
      "Usar o nome do viajante em cada interacao.",
      "Registrar feedbacks magicos no Correio."
    ],
    quest: "Ouvinte de Viajantes",
    pontos: 35,
    recorrencia: "Semanal"
  },
  {
    id: "ritual-fechamento",
    titulo: "Fechamento da Oficina",
    tipo: "Operacao",
    resumo: "Ritual para fechar a casa e preparar o proximo ciclo.",
    videoUrl: "",
    steps: [
      "Checklist de limpeza por estacao.",
      "Registrar estoque critico no laboratorio.",
      "Enviar sinais ao gestor via Clima da Tripulacao."
    ],
    quest: "Guardiao da Noite",
    pontos: 50,
    recorrencia: "Diaria"
  }
];

export const quests = [
  {
    id: "quest-ritual-manha",
    titulo: "Ritual da Manha",
    categoria: "Operacao",
    descricao: "Completar o checklist de abertura 7 dias seguidos.",
    recompensa: {
      pontos: 80,
      insignia: "Guardiao da Manha",
      titulo: "Sentinela do Portal",
      duracao: 14
    },
    progresso: 0.6,
    status: "Em andamento"
  },
  {
    id: "quest-mentoria-forno",
    titulo: "Sombras do Fogo",
    categoria: "Aprendizado",
    descricao: "Acompanhar um guardiao do forno por 3 turnos completos.",
    recompensa: {
      pontos: 60,
      insignia: "Aprendiz do Fogo",
      titulo: null,
      duracao: null
    },
    progresso: 0.33,
    status: "Disponivel"
  },
  {
    id: "quest-faisca-positiva",
    titulo: "Faiscas de Cuidado",
    categoria: "Cultura",
    descricao: "Receber 5 faiscas em um mes destacando atitudes positivas.",
    recompensa: {
      pontos: 45,
      insignia: "Guardiao da Massa",
      titulo: "Coracao da Tripulacao",
      duracao: 30
    },
    progresso: 0.8,
    status: "Quase la"
  },
  {
    id: "quest-coletiva-checklist",
    titulo: "Circulo Perfeito",
    categoria: "Coletiva",
    descricao: "Toda a loja completar 100% dos checklists durante uma semana.",
    recompensa: {
      pontos: 200,
      insignia: "Ordem Harmonizada",
      titulo: null,
      duracao: null
    },
    progresso: 0.4,
    status: "Desafio ativo"
  }
];

export const correio = {
  naoLidas: [
    {
      id: "msg-1",
      titulo: "Meta da lua cheia batida!",
      autor: "Alquimides",
      corpo:
        "A tripulacao elevou a casa a 120% da meta semanal. Preparar surpresa na Feira.",
      data: "2024-11-10",
      recompensa: " +30 moedas",
      prioridade: "Alta"
    },
    {
      id: "msg-p2",
      titulo: "Lembrete de quest",
      autor: "Sistema",
      corpo:
        "Finalize o tutorial de atendimento para destravar 'Ouvinte de Viajantes'.",
      data: "2024-11-12",
      recompensa: " +1 insignia",
      prioridade: "Media"
    }
  ],
  lidas: [
    {
      id: "msg-p1",
      titulo: "Valeu por salvar o turno!",
      autor: "Luna",
      corpo:
        "Ontem voce segurou o forno quando a demanda explodiu. Guardiao da Noite total.",
      data: "2024-11-11",
      recompensa: null,
      prioridade: "Baixa"
    },
    {
      id: "msg-2",
      titulo: "Nova receita em teste",
      autor: "Alquimista-chefe",
      corpo:
        "Quem estiver nos turnos de terca testara o Ritual Banana com especiarias. Registrem feedbacks.",
      data: "2024-11-12",
      recompensa: null,
      prioridade: "Media"
    }
  ]
};

export const faiscas = {
  disponiveis: 3,
  recebidas: [
    {
      id: "f1",
      autor: "Kai",
      mensagem: "Obrigado por reorganizar o estoque comigo!",
      data: "2024-11-12"
    },
    {
      id: "f2",
      autor: "Nara",
      mensagem: "Sua energia no atendimento levantou o turno <3",
      data: "2024-11-09"
    }
  ],
  enviadas: [
    {
      id: "f3",
      para: "Mila",
      mensagem: "Valeu por cobrir minha pausa ontem.",
      data: "2024-11-10"
    }
  ]
};

export const ideias = [
  {
    id: "idea-1",
    titulo: "Mesa do Viajante Iniciante",
    tag: "Experiencia",
    status: "Em teste",
    votos: 12,
    autor: "Kai",
    descricao: "Canto especial para quem visita a TG pela primeira vez."
  },
  {
    id: "idea-2",
    titulo: "Check rapidos no tablet",
    tag: "Operacao",
    status: "Implementada",
    votos: 21,
    autor: "Luna",
    descricao: "Usar tablets para checklists de abertura/fechamento."
  },
  {
    id: "idea-3",
    titulo: "Playlist dos viajantes",
    tag: "Cultura",
    status: "Em analise",
    votos: 7,
    autor: "Mila",
    descricao: "Cada colaborador adiciona 1 faixa tematica do universo TG."
  }
];

export const clima = [
  {
    id: "clima-1",
    turno: "Noite",
    status: "Vermelho",
    comentario: "Fila pesada + equipe curta. Precisamos reforco.",
    data: "2024-11-11"
  },
  {
    id: "clima-2",
    turno: "Tarde",
    status: "Amarelo",
    comentario: "Cansaco acumulado pos evento.",
    data: "2024-11-10"
  },
  {
    id: "clima-3",
    turno: "Manha",
    status: "Azul",
    comentario: "Tudo suave, turno fluindo bem.",
    data: "2024-11-09"
  }
];

export const painelGestor = {
  engajamento: {
    ativosSemana: 26,
    totalTripulacao: 30,
    tutoriaisConcluidos: 58
  },
  operacao: {
    checklistsCompletos: 0.85,
    questsOperacionais: 12
  },
  cultura: {
    faiscasSemana: 42,
    ideiasNovas: 5
  },
  clima: {
    alertasVermelhos: 3,
    turnosMonitorados: 5
  },
  destaques: [
    { nome: "Luna", titulo: "Guardia da Massa", insignias: 3 },
    { nome: "Kai", titulo: "Sentinela do Portal", insignias: 2 }
  ]
};
