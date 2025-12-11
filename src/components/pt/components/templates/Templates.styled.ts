import styled from "styled-components";
import { TableContainer } from "../../../shared/styles/Table.styled";
import { ImageCell } from "../categories/Categories.styled";

export const Container = styled(TableContainer)`
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const GridCard = styled("div")`
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const GridCardHeader = styled.div`
  gap: 10px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

export const GridCardTitle = styled.div`
  flex: 1;
`;

export const GridCardActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const GridImage = styled(ImageCell)`
  img {
    object-position: center;
  }
`;
