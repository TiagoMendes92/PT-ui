import { ProtectedRoute } from "./ProtectedRoute";

export const PTProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  "use memo";
  return <ProtectedRoute allowedRoles={["pt"]}>{children}</ProtectedRoute>;
};
