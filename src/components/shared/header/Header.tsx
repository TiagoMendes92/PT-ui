import { Fragment, useState } from "react";
import {
  Container,
  Drawer,
  DrawerButton,
  DrawerLink,
  DrawerLinks,
  Line,
} from "./Header.styles";
import type { HeaderProps } from "./types";
import Hamburger from "hamburger-react";
import { useAuth } from "../../app/AuthContent.context";

const Header = ({ links }: HeaderProps) => {
  "use memo";
  const [isOpen, setOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  return (
    <Container>
      <Line>
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <div>
          Hi, <b>{user?.name}</b>
        </div>
      </Line>
      <Drawer isOpen={isOpen}>
        <DrawerLinks>
          {links.map((section) => (
            <Fragment key={section.section}>
              <div style={{ color: "black" }}>{section.section}</div>
              {section.links.map((link) => (
                <DrawerLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </DrawerLink>
              ))}
            </Fragment>
          ))}
          <DrawerButton onClick={logout}>LOG OUT</DrawerButton>
        </DrawerLinks>
      </Drawer>
    </Container>
  );
};

export default Header;
