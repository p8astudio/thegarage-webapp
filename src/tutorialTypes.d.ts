export type TutorialRole = "Alquimistas" | "Mensageiros" | "Entregas" | "Gestao";

export interface TutorialStep {
  id: string;
  titulo: string;
  descricao: string;
}

export interface Tutorial {
  id: string;
  trackId: string;
  titulo: string;
  resumo: string;
  role: TutorialRole;
  videoUrl?: string;
  badge?: string;
  tempoMinutos?: number;
  steps: TutorialStep[];
  concluido?: boolean;
}

export interface TutorialTrack {
  id: string;
  titulo: string;
  descricao: string;
  foco: string;
  role: TutorialRole;
  destaque?: string;
  duracaoEstimativa?: string;
  icone?: string;
  cor?: string;
}

export const TUTORIAL_TRACKS: TutorialTrack[];
export const ALL_TUTORIALS: Tutorial[];
