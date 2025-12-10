import styled from "styled-components";

export const Container = styled("div")`
  height: 100%;
  display: flex;
  min-height: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
    overflow: hidden;
    flex-direction: row;
  }
`;

export const PageContainer = styled("div")`
  flex: 1;
`;
