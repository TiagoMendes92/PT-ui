import { ProtectedRoute } from "./ProtectedRoute";

export const PTProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ProtectedRoute allowedRoles={["pt"]}>{children}</ProtectedRoute>;
};
