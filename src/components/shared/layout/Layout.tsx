import { Outlet } from "react-router-dom";
import { Container, PageContainer } from "./Layout.styles";
import type { HeaderProps } from "../header/types";
import Header from "../header/Header";
import useIsMobile from "../../../hooks/useIsMobile";
import Sidebar from "../sidebar/Sidebar";
import { Suspense } from "react";

const Layout = ({ links }: HeaderProps) => {
  const isMobile = useIsMobile();
  return (
    <Container>
      {isMobile ? <Header links={links} /> : <Sidebar links={links} />}
      <PageContainer>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </PageContainer>
    </Container>
  );
};

export default Layout;
