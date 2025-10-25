import styled from "styled-components";

export const Container = styled("div")`
  max-width: 800px;
  margin-inline: auto;
`;

export const Photo = styled("div")`
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  margin-inline: auto;
  margin-bottom: 100px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
