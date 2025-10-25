import { useAuth } from "../app/AuthContent.context";

const MainPage = () => {
  const { user } = useAuth();

  return <>Olá {user?.name}</>;
};

export default MainPage;
