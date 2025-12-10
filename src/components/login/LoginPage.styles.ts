import styled from "styled-components";

export const Container = styled("div")`
  gap: 30px;
  height: 100%;
  display: flex;
  padding: 30px 5px;
  background: #0047f9;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

export const Content = styled("div")`
  flex: 1;
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  max-width: 450px;
`;
