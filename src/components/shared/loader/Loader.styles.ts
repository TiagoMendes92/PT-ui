import styled, { keyframes } from "styled-components";
import type { LoaderProps } from "./types";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled("div")<LoaderProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) => props.thickness}px solid rgba(0, 0, 0, 0.1);
  border-top: ${(props) => props.thickness}px solid ${(props) => props.color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
