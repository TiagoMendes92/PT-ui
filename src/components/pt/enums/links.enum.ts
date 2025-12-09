import type { HeaderLink } from "../../shared/header/types";

export const links: HeaderLink[] = [
  {
    section: "Admin",
    links: [
      {
        label: "Treinos",
        path: "/pt/trainings",
      },
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
