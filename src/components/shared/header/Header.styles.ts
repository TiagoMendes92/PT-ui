import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../../login/LoginPage.styles";

export const Container = styled("div")`
  z-index: 1;
  display: flex;
  overflow-x: hidden;
  position: relative;
`;

export const Line = styled("div")`
  z-index: 1;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

export const Drawer = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: grey;
  transition: transform 0.3s ease;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      transform: translateX(-100%);
    `};
`;

export const DrawerLinks = styled("div")`
  margin-top: 70px;
  margin-inline: 15px;
  height: calc(100% - 100px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DrawerLink = styled(NavLink)`
  color: white;
  font-size: 25px;
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }
`;

export const DrawerButton = styled(Button)`
  color: black;
  font-size: 25px;
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }
`;
