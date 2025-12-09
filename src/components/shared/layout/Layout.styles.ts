import styled from "styled-components";

export const Container = styled("div")`
  min-height: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const PageContainer = styled("div")`
  flex: 1;
`;
