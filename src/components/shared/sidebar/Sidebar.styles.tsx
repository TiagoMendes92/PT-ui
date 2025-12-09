import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled("div")`
  width: 300px;
  color: white;
  display: flex;
  max-height: 100vh;
  padding-block: 40px;
  background: #0047f9;
  flex-direction: column;
`;

export const Logo = styled("div")`
  display: flex;
  align-self: center;
  margin-bottom: 40px;
  align-items: center;

  img {
    width: 60px;
    height: auto;
  }
`;

export const Name = styled("div")`
  font-size: 12px;
  line-height: 0.75;
  font-variant: all-small-caps;

  div {
    font-weight: 700;
  }
`;

export const ProfilePhoto = styled("div")`
  width: 125px;
  height: 125px;
  overflow: hidden;
  align-self: center;
  border-radius: 50%;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const UserName = styled("div")`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export const UserRole = styled("div")`
  font-size: 13px;
  text-align: center;
`;

export const LinksContainer = styled("div")`
  flex: 1;
  overflow-y: auto;
  padding-block: 30px;
  padding-left: 20px;
`;

export const SingleLinkContainer = styled("div")`
  position: relative;
  overflow: visible;
  font-size: 13px;
  color: white;

  &::before {
    inset: 0;
    content: "";
    top: -20px;
    position: absolute;
    background: #fafafa;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
    clip-path: path(
      "M 280,0 Q 280,20 260,20 L 20,20 Q 0,20 0,40 Q 0,60 20,60 L 260,60 Q 280,60 280,80 Z"
    );
  }

  &:hover {
    color: #1f2937;
    &::before {
      transform: scaleX(1);
    }
  }
  &:has(.active) {
    color: #1f2937;
    &::before {
      transform: scaleX(1);
    }
  }
`;

export const SingleLink = styled(NavLink)`
  z-index: 10;
  height: 60px;
  display: flex;
  color: inherit;
  font-weight: 600;
  position: relative;
  align-items: center;
  text-decoration: none;
  padding: 0px 20px 20px;
  transition: color 0.3s ease;
`;

export const Logout = styled("div")`
  gap: 10px;
  display: flex;
  font-size: 12px;
  cursor: pointer;
  width: fit-content;
  align-self: center;
  align-items: center;
  justify-content: center;

  > div {
    gap: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: black;
    border-radius: 50%;
    padding: 5px;

    img {
      filter: invert(1);
    }
  }
`;
