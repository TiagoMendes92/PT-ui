import styled, { css } from "styled-components";

export const Form = styled("form")`
  padding-top: 30px;
  input {
    width: -webkit-fill-available;
  }
`;

export const FormController = styled("div")`
  position: relative;
  margin-bottom: 25px;

  label {
    font-size: 14px;
  }
`;

export const Input = styled("input").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>`
  outline: 0;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 16px;
  padding-block: 10px;
  padding-inline: 15px;
  font-family: montserrat;
  transition: border-color 0.3s ease;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "lightgrey")};
`;

export const TextArea = styled("textarea").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>`
  outline: 0;
  resize: none;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 16px;
  padding-block: 10px;
  padding-inline: 15px;
  width: calc(100% - 32px);
  transition: border-color 0.3s ease;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "lightgrey")};
`;

export const Error = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "generic",
})<{ generic?: boolean }>`
  color: red;
  font-size: 10px;

  ${({ generic }) =>
    !generic
      ? css`
          bottom: 0;
          left: 16px;
          position: absolute;
          transform: translateY(calc(100% + 5px));
        `
      : css`
          margin-bottom: 10px;
        `};
`;
