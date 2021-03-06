import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: 20px;
  height: 100vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  color: #fff;
  font-size: 16px;
  background: #429911;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin: 5px;
  border: 0;
  border-radius: 5px;
  width: 100%;
`;
