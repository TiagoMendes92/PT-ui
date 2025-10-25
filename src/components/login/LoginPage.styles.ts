import styled, { css } from "styled-components";

export const Container = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Content = styled("div")`
  width: 100%;
  margin: 20px;
  max-width: 450px;
`;

export const Title = styled("h1")`
  font-size: 50px;
`;

export const FormController = styled("div")`
  color: white;
  position: relative;
  margin-bottom: 25px;
`;

export const Input = styled("input").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>`
  outline: 0;
  width: 100%;
  padding: 8px;
  color: white;
  font-size: 18px;
  margin-top: 10px;
  background: black;
  border-radius: 0px;
  border: 2px solid ${({ hasError }) => (hasError ? "red" : "white")};
  transition: border-color 0.3s ease;
`;

export const Error = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "generic",
})<{ generic?: boolean }>`
  color: red;
  font-size: 10px;

  ${({ generic }) =>
    !generic
      ? css`
          left: 0;
          bottom: 0;
          position: absolute;
          transform: translateY(calc(100% + 5px));
        `
      : css`
          margin-bottom: 10px;
        `};
`;

export const Button = styled("button")`
  width: 100%;
  color: black;
  padding: 0px;
  height: 40px;
  border: unset;
  display: flex;
  cursor: pointer;
  background: white;
  align-items: center;
  border: 2px solid white;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: grey;
  }
`;

export const CancelButton = styled(Button)`
  color: white;
  background: black;
`;
