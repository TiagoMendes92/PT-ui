import type { HeaderLink } from "../../shared/header/types";

export const links: HeaderLink[] = [
  {
    section: "Admin",
    links: [
      {
        label: "Templates",
        path: "/pt/templates",
      },
      {
        label: "Alunos",
        path: "/pt/users",
      },
      {
        label: "Categorias",
        path: "/pt/categories",
      },
      {
        label: "Exercícios",
        path: "/pt/exercises",
      },
      {
        label: "Variaveis de Exercícios",
        path: "/pt/exercise_variables",
      },
    ],
  },
];
