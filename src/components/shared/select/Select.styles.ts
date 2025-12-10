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
  display: flex;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  text-align: left;
  background: white;
  padding-block: 10px;
  border-radius: 16px;
  align-items: center;
  transition: all 0.2s;
  font-family: inherit;
  padding-inline: 15px;
  justify-content: space-between;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "lightgrey")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Placeholder = styled.span`
  color: #757575;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

export const SelectedValue = styled.span`
  color: black;
  whitespace: nowrap;
  overflow: hidden;
  textoverflow: ellipsis;
  display: block;
`;

export const Arrow = styled("span").withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<SelectArrowType>`
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  img {
    width: 14px;
  }
`;

export const Dropdown = styled("div").withConfig({
  shouldForwardProp: (prop) =>
    !["isOpen", "top", "left", "width"].includes(prop),
})<SelectDropdownProps>`
  z-index: 9999;
  position: fixed;
  overflow-y: auto;
  background: white;
  max-height: 250px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid lightgrey;
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
  font-size: 14px;
  transition: background-color 0.15s;

  ${(props) =>
    props.isSelected
      ? css`
          color: black;
          background-color: #f5f6f9;
        `
      : css`
          background-color: white;
        `}

  &:hover {
    background-color: grey;
  }
`;

export const EmptyOption = styled(Option)`
  color: #6b7280;
  font-size: 14px;
  font-style: italic;
`;
