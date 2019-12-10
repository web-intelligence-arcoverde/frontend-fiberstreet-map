import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  left: 30px;
`;

export const Widge = styled.div`
  background-color: black;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  border: 3px solid #fff;
  &:hover {
    border: 3px solid #d8d8d8;
  }
`;
