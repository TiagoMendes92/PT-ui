import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

export const ExerciseCard = styled.div`
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
`;

export const ExerciseHeader = styled.h4`
  font-size: 16px;
  margin-bottom: 12px;
  color: #444;
`;

export const SetCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

export const SetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SetTitle = styled.div`
  font-size: 14px;
  color: #666;
`;

export const RemoveButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #cc0000;
  }
`;

export const VariablesGrid = styled.div`
  gap: 6px;
  display: flex;
  flex-direction: column;
`;

export const VariableItem = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
`;

export const VariableCheckbox = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 15px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    font-size: 12px;
  }
`;

export const VariableInputContainer = styled.div`
  flex: 1;
  max-width: 250px;
  position: relaive;
  margin-left: auto;
`;

export const VariableInput = styled.input`
  font-size: 13px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const AddSetButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;
