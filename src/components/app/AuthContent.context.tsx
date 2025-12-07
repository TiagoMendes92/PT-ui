import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuery } from "relay-runtime";
import { useRelayEnvironment } from "react-relay";
import { ME_QUERY } from "./Me.queries";
import type { MeQuery } from "../../__generated__/MeQuery.graphql";

export type User = {
  id: string;
  name: string;
  role: string;
  email?: string;
};

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const environment = useRelayEnvironment();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchQuery<MeQuery>(environment, ME_QUERY, {}).subscribe({
        next: (data) => {
          if (data.me) {
            setUser(data.me);
          }
          setLoading(false);
        },
        error: () => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        },
      });
    }
    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
