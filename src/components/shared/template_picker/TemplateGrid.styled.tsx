import styled from "styled-components";

export const TemplateList = styled("div")`
  gap: 15px;
  padding: 8px;
  display: flex;
  overflow: auto;
  max-height: 260px;
  border-radius: 16px;
  margin-bottom: 20px;
  flex-direction: column;
  border: 1px solid lightgrey;
`;

export const TemplateCard = styled("div")`
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  ol {
    margin-block: 0;
  }
`;

export const TemplateCardHeader = styled.div`
  gap: 20px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;

  img {
    max-height: 50px;
  }
`;
