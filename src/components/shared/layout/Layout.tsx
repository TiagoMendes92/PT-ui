import { Outlet } from "react-router-dom";
import { Container } from "./Layout.styles";
import type { HeaderProps } from "../header/types";
import Header from "../header/Header";

const Layout = ({ links }: HeaderProps) => (
  <Container>
    <Header links={links} />
    <Outlet />
  </Container>
);

export default Layout;
