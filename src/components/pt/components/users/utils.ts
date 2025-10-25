export const statusMappings = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "Ativo";
    case "deactivated":
      return "Desativo";
    case "pending":
      return "Pendente";
    default:
      return "";
  }
};
