import { ProtectedRoute } from "./ProtectedRoute";

export const AlunoProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ProtectedRoute allowedRoles={["aluno"]}>{children}</ProtectedRoute>;
};
