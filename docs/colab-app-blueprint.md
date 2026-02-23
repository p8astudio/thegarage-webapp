App Colaboradores The Garage - Blueprint
=======================================

Documento vivo para orientar a construcao do aplicativo interno "Tripulacao The Garage". Ele traduz o universo narrativo em fluxos, dados e prioridades de produto.

---

## 1. Contexto e Principios

- **De dentro para fora**: engajar a tripulacao primeiro para refletir isso nos clientes.
- **Narrativa unica**: toda interacao precisa parecer parte do universo (titulos, itens, personagens).
- **Sinal + Sistema**: cada ritual (quest, checklist, mensagem) gera dados uteis para gestao.
- **Simplicidade guiada**: pequenas entregas com impacto imediato; iterar rapido.

---

## 2. Estrutura do Produto

| Modulo | Objetivo | Eventos / Dados gerados |
| --- | --- | --- |
| Ficha de Viajante | Identidade e historico do colaborador | Atualizacao de skills, titulos, progressao |
| Tutoriais & Guia dos Alquimistas | Capacitacao e rituais operacionais | Conclusao de tutoriais, checklists recorrentes |
| Correio Alquimista | Comunicacao cultural e avisos | Envio/leitura de mensagens, engajamento |
| Quests & Insignias | Gamificacao de acoes-chave | Pontos, insignias, titulos temporarios |
| Faiscas de Gratidao | Reconhecimento entre pares | Envio/recebimento de faiscas, contadores |
| Clima da Tripulacao | Termometro de bem-estar | Pulsos de humor, alertas |
| Laboratorio de Alquimia | Ideias e melhorias | Sugestoes, votos, status |
| Painel do Gestor | Insights operacionais | Consolidacao de metricas dos modulos |

---

## 3. Ficha de Viajante

**Campos principais**

- Icone/personagem desbloqueado.
- Nivel + titulo atual ("Guardiao do Forno - Nivel 3").
- Linha do tempo: data de entrada, evolucoes de funcao.
- Skills (Forno, Massa, Atendimento, etc.) marcadas com badges simples (checkbox visual).
- Aba de reconhecimentos recebidos (faiscas, insignias recentes).

**Dados minimos (MVP)**

```json
{
  "id": "uuid",
  "nome": "string",
  "icone": "enum",
  "nivel": 3,
  "titulo": "Guardiao da Massa",
  "pontos": 420,
  "skills": ["Forno", "Atendimento"],
  "linhaTempo": [
    {"data": "2024-06-01", "evento": "Entrada"},
    {"data": "2024-11-10", "evento": "Treinamento forno"}
  ],
  "faiscasRecebidas": 12
}
```

---

## 4. Tutoriais & Guia dos Alquimistas

- **Sessao "Livro de Receitas da Ordem"**: cards com video curto + texto + checklist.
- **Checklist ritual**: abertura, fechamento, limpeza; colaborador marca "feito" e adiciona nota opcional.
- **Integracao com quests**: primeira conclusao gera insignia (ex.: "Aprendiz do Fogo" para tutorial do forno).
- **Eventos rastreados**: visualizacao, conclusao, recorrencia cumprida, atrasos.

**Estrutura sugerida**

```json
{
  "tutorialId": "forno-basico",
  "tipo": "operacao | cultura | atendimento",
  "conteudo": {
    "videoUrl": "",
    "texto": "",
    "checklist": ["Passo 1", "Passo 2"]
  },
  "questAssociada": "insignia-aprendiz-fogo",
  "recorrencia": "daily | weekly | null"
}
```

---

## 5. Correio Alquimista

- **Abas**:
  - `Mensagens da Ordem`: comunicados gerais assinados por "Alquimides".
  - `Para voce`: elogios, avisos direcionados, lembretes de quests pendentes.
- **Tipos de conteudo**: boas noticias, mudancas operacionais, drops do lore.
- **Interacoes**: marcar como lido, reagir (fogo, espada, pizza), fixar mensagens.
- **Backlog futuro**: anexos, confirmacao de leitura por cargo.

---

## 6. Quests Internas & Insignias

**Categorias**

1. Aprendizado (tutoriais/mentorias).
2. Operacao (checklists, SLAs, produtividade).
3. Cultura/atitude (feedbacks positivos, ajudar colegas).
4. Coletivas (metas por loja/turno).

**Mecanica**

- Quest = gatilho + criterio + recompensa.
- Recompensas: pontos, insignias visuais exibidas na Ficha, titulos temporarios.
- Ciclos sugeridos: semanais (operacionais), mensais (cultura), sazonais (coletivas).

**Modelo**

```json
{
  "questId": "checklist-abertura-7dias",
  "categoria": "operacao",
  "criterio": "7 checklists completos consecutivos",
  "recompensa": {
    "pontos": 80,
    "insignia": "Guardiao da Manha",
    "tituloTemporario": "Sentinela do Portal",
    "duracaoTituloDias": 14
  }
}
```

---

## 7. Faiscas de Gratidao

- Cada colaborador possui 3 faiscas/semana (reset segunda-feira).
- Fluxo: escolher colega -> escrever mensagem curta -> opcional colocar sticker do universo -> enviar.
- Perfil exibe contador semanal e total; tambem alimenta quests de cultura ("Acumular 20 faiscas").
- Painel mostra heatmap de trocas por loja/turno.

---

## 8. Clima, Saude e Cansaco

- Pulso rapido (1 vez por turno ou semanal): azul suave, amarelo cansado, vermelho sobrecarregado + comentario opcional.
- Alertas automaticos:
  - 3 marcacoes vermelhas seguidas -> notificar gestor.
  - Turno com >40% amarelo/vermelho -> destaque no painel.
- Integracao com quests de lideranca: resolver alertas e registrar acao (ex.: reorganizar escala) gera insignia "Guardiao da Tripulacao".

---

## 9. Laboratorio de Alquimia

- Campos: titulo, descricao, tag (Produto/Operacao/Experiencia), impacto esperado.
- Interacoes: upvotes, comentarios, status (Em analise -> Em teste -> Implementada -> Arquivada).
- Gamificacao: ideia implementada concede insignia "Alquimista Inovador" + pontos extras.
- Exportavel para planilha/BI posteriormente.

---

## 10. Painel do Gestor

Indicadores iniciais:

1. **Engajamento**: % tripulacao com login na semana, tutoriais concluidos.
2. **Operacao**: checklists completos por turno, quests operacionais finalizadas.
3. **Cultura**: faiscas enviadas/recebidas, ideias submetidas.
4. **Clima**: pulso medio por loja, alertas por colaborador.
5. **Top destaques**: colaboradores com mais insignias recentes, lojas com maior consistencia.

Camada futura: cruzar com dados externos (avaliacoes no app de delivery, tempo de entrega).

---

## 11. MVP Prioritario

1. **Autenticacao + Ficha de Viajante basica**
   - Login simples, selecao de icone, niveis e poucos campos editaveis.
2. **Tutoriais essenciais**
   - 3-5 fluxos criticos (abrir loja, fechamento, reclamacao de cliente).
   - Checklist com marcacao unica e registro de conclusao.
3. **Quests simples**
   - Uma quest por tutorial -> concede insignia e pontos.
4. **Correio Alquimista (mensagens da lideranca)**
   - CRUD simples de comunicados.
5. **Faiscas de Gratidao**
   - Enviar/receber, contadores no perfil.

Itens para V2+: clima, laboratorio de ideias, painel robusto, titulos temporarios avancados.

---

## 12. Tech Notes & Proximos Passos

- **Frontend**: manter React atual; introduzir state global (Context API ou Zustand) para perfis e modulos.
- **Backend**: endpoints REST simples `/cadastro`, `/login`, `/perfil`, `/tutoriais`, `/quests`, `/faiscas`.
- **Design System**: reaproveitar paleta atual (#202020, #F2784A) + icones do universo, aplicar componentes (cards, badges, barras de progresso).
- **Roadmap sugerido**:
  1. Ajustar telas existentes para "Ficha de Viajante" (renomear Perfil -> Tripulacao, adicionar badges).
  2. Criar tela modular para Tutoriais/Quests (cards com progresso).
  3. Implementar Correio Alquimista (feed + abas).
  4. Ativar Faiscas e contadores.
  5. Coletar dados basicos para painel (mesmo que apenas exportacao CSV).

Este blueprint serve como referencia para design, produto e desenvolvimento enquanto o app evolui para abracar toda a narrativa "The Garage".
