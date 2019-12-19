import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    margin: 10px;
  }
  @media (min-width: 992px) {
    justify-content: flex-end;
    margin: 10px;
  }
`;
