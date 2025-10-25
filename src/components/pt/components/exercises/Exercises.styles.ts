import styled, { css } from "styled-components";
import { Button, Input } from "../../../login/LoginPage.styles";

export const VerifyButton = styled(Button)`
  right: 0;
  top: 31px;
  width: 45px;
  height: 39px;
  position: absolute;

  img {
    height: 20px;
  }
`;

export const VideoInput = styled(Input)`
  padding-right: 55px;
`;
export const ChipsContainer = styled("div")`
  gap: 5px;
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
`;

export const Chip = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  font-size: 10px;
  border: 1px solid white;
  padding: 2px 8px;
  border-radius: 9px;

  ${({ isActive }) =>
    isActive
      ? css`
          background: white;
          color: black;
        `
      : css`
          background: black;
          color: white;
        `};
`;
