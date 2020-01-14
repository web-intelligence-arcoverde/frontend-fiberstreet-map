import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ContainerSearch = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  width: 180px;
`;

export const InputSearch = styled.input.attrs({
  id: 'filter-input',
  type: 'text',
  name: 'filter',
  placeholder: 'Filter by name',
})`
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: 100%;
  border: 0;
  background-color: #fff;
  height: 40px;
  margin: 0;
  color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;
