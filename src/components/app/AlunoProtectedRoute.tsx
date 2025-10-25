import { ProtectedRoute } from "./ProtectedRoute";

export const AlunoProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  "use memo";
  return <ProtectedRoute allowedRoles={["aluno"]}>{children}</ProtectedRoute>;
};
