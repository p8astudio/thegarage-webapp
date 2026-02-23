export const DEFAULT_ROLE = "Alquimistas";

export function normalizeRole(role) {
  const map = {
    Alquimista: "Alquimistas",
    Alquimistas: "Alquimistas",
    Mensageiro: "Mensageiros",
    Mensageiros: "Mensageiros",
    Entregas: "Entregas",
    Gestao: "Gestao",
    "Gestão": "Gestao"
  };
  return map[role] || role || DEFAULT_ROLE;
}

export function roleLabel(role) {
  const normalized = normalizeRole(role);
  const labels = {
    Alquimistas: "Alquimistas",
    Mensageiros: "Mensageiros",
    Entregas: "Entregas",
    Gestao: "Gestao"
  };
  return labels[normalized] || normalized;
}
