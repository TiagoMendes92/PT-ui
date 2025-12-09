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
  margin: 0;
  font-size: 24px;
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

export const Button = styled("button")`
  gap: 10px;
  width: 100%;
  color: white;
  padding: 6px;
  height: 36px;
  display: flex;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  background: #0047f9;
  align-items: center;
  border: 1px solid #0047f9;
  justify-content: center;
  border-radius: 8px;
  letter-spacing: 0.75px;
  font-variant: small-caps;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    color: #0047f9;
    background: white;
  }

  img {
    width: 17px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CancelButton = styled(Button)`
  color: white;
  background: black;
`;
