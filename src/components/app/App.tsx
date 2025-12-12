import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContent.context";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../login/LoginPage";

// PT ROUTES
import Layout from "../shared/layout/Layout";
import { PTProtectedRoute } from "./PTProtectedRoute";
import PT from "../pt/MainPage";
import { links as ptlinks } from "../pt/enums/links.enum";
import PTCategories from "../pt/components/categories/Categories";
import PTExercises from "../pt/components/exercises/Exercises";
import PTUsers from "../pt/components/users/Users";
import PTUser from "../pt/components/user/User";
import PTTemplates from "../pt/components/templates/Templates";
import PTExerciseVariables from "../pt/components/exercise_variables/Exercise_Variables";

// Aluno Routes
import Aluno from "../aluno/MainPage";
import { AlunoProtectedRoute } from "./AlunoProtectedRoute";
import AlunoProfile from "../aluno/components/profile/Profile";
import RegisterPage from "../register/Register";
import { links as alunoLinks } from "../aluno/enums/links.enum";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register/:token"
          element={user ? <Navigate to="/" replace /> : <RegisterPage />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedRoute>
                {user?.role === "pt" ? (
                  <Navigate to="/pt" replace />
                ) : (
                  <Navigate to="/aluno" replace />
                )}
              </ProtectedRoute>
            </ProtectedRoute>
          }
        />
        {/* PT Routes */}
        <Route
          path="/pt"
          element={
            <PTProtectedRoute>
              <Layout links={ptlinks} />
            </PTProtectedRoute>
          }
        >
          <Route index element={<PT />} />
          <Route path="categories" element={<PTCategories />} />
          <Route path="exercises" element={<PTExercises />} />
          <Route path="users" element={<PTUsers />} />
          <Route path="users/:id" element={<PTUser />} />
          <Route path="templates" element={<PTTemplates />} />
          <Route path="exercise_variables" element={<PTExerciseVariables />} />
          <Route path="perfil" element={<AlunoProfile />} />
        </Route>
        {/* Client Routes */}
        <Route
          path="/aluno"
          element={
            <AlunoProtectedRoute>
              <Layout links={alunoLinks} />
            </AlunoProtectedRoute>
          }
        >
          <Route index element={<Aluno />} />
          <Route path="perfil" element={<AlunoProfile />} />
        </Route>

        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
