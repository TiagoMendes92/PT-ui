import { usePreloadedQuery, useQueryLoader } from "react-relay";
import {
  Container,
  LinksContainer,
  Logo,
  Logout,
  Name,
  ProfilePhoto,
  SingleLink,
  SingleLinkContainer,
  UserName,
  UserRole,
} from "./Sidebar.styles";
import type { SidebarLoaderProps, SidebarProps } from "./Sidebar.types";
import type { ProfileQuery } from "../../../__generated__/ProfileQuery.graphql";
import { GET_PROFILE } from "../../aluno/components/profile/Profile.queries";
import { useAuth, type User } from "../../app/AuthContent.context";
import { useEffect } from "react";
import PreviewFile from "../preview_file/PreviewFiles";

const Sidebar = ({ links, user, queryRef }: SidebarProps) => {
  const data = usePreloadedQuery<ProfileQuery>(GET_PROFILE, queryRef);
  const { logout } = useAuth();
  return (
    <Container>
      <Logo>
        <img src="/logo.png" />
        <Name>
          <div>João Mendes</div>
          Personal Trainer
        </Name>
      </Logo>
      <ProfilePhoto>
        <PreviewFile file={data.userDetails?.photographyUrl || null} />
      </ProfilePhoto>
      <UserName>{user.name}</UserName>
      <UserRole>{user.role === "pt" ? "Personal Trainer" : "Aluno"}</UserRole>
      <LinksContainer>
        {links
          .flatMap(({ links }) => links)
          .map((link) => (
            <SingleLinkContainer>
              <SingleLink to={link.path}>
                <span>{link.label}</span>
              </SingleLink>
            </SingleLinkContainer>
          ))}
      </LinksContainer>
      <Logout onClick={logout}>
        <div>
          <img src="/logout.svg" />
        </div>
        Logout
      </Logout>
    </Container>
  );
};

const Loader = ({ links }: SidebarLoaderProps) => {
  const { user } = useAuth();
  const [queryRef, fetchData] = useQueryLoader<ProfileQuery>(GET_PROFILE);

  useEffect(() => {
    fetchData({ user_id: user!.id });
  }, []);

  return queryRef ? (
    <Sidebar queryRef={queryRef} links={links} user={user as User} />
  ) : null;
};

export default Loader;
