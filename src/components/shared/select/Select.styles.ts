import styled, { css } from "styled-components";
import type {
  OptionProps,
  SelectArrowType,
  SelectButtonProps,
  SelectDropdownProps,
} from "./types";

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectButton = styled("button").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<SelectButtonProps>`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  text-align: left;
  background: black;
  border: 2px solid ${({ hasError }) => (hasError ? "red" : "white")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 18px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Placeholder = styled.span`
  color: #747474;
`;

export const SelectedValue = styled.span`
  color: white;
`;

export const Arrow = styled("span").withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<SelectArrowType>`
  color: white;
  font-size: 10px;
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export const Dropdown = styled("div").withConfig({
  shouldForwardProp: (prop) =>
    !["isOpen", "top", "left", "width"].includes(prop),
})<SelectDropdownProps>`
  z-index: 9999;
  position: fixed;
  overflow-y: auto;
  background: black;
  max-height: 250px;
  box-sizing: border-box;
  border: 2px solid white;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

export const Option = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<OptionProps>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.15s;

  ${(props) =>
    props.isSelected
      ? css`
          color: black;
          background-color: #eff6ff;
        `
      : css`
          background-color: black;
        `}

  &:hover {
    background-color: grey;
  }
`;

export const EmptyOption = styled(Option)`
  color: #6b7280;
  font-style: italic;
`;
