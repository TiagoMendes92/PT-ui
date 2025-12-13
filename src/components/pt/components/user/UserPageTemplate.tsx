import { useNavigate } from "react-router-dom";
import { BackButton, UserPage, UserPageHeader } from "./User.styled";
import type { ReactNode } from "react";

const UserPageTemplate = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <UserPage>
      <UserPageHeader onClick={() => navigate("/pt/users")}>
        <BackButton action="delete">
          <img src="/chevron.svg" />
        </BackButton>
      </UserPageHeader>
      {children}
    </UserPage>
  );
};

export default UserPageTemplate;
