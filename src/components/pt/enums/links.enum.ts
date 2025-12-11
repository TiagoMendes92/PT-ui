import type { HeaderLink } from "../../shared/header/types";

export const links: HeaderLink[] = [
  {
    section: "Admin",
    links: [
      {
        label: "Categorias",
        path: "/pt/categories",
      },
      {
        label: "Variaveis de Exercícios",
        path: "/pt/exercise_variables",
      },
      {
        label: "Exercícios",
        path: "/pt/exercises",
      },
      {
        label: "Treinos",
        path: "/pt/templates",
      },
      {
        label: "Alunos",
        path: "/pt/users",
      },
    ],
  },
  {
    section: "Pefil",
    links: [
      {
        label: "Perfil",
        path: "/pt/perfil",
      },
    ],
  },
];
