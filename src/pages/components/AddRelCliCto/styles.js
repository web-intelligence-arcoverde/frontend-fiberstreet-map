import styled from "styled-components";

export const IconOutSp = styled.div`
  height: 25px;
  width: 25px;
  background-color: ${props => (props.active === true ? "#AAF1A0" : "#FF000A")};
  border-radius: 50%;
  display: inline-block;
`;
// display: inline-block
// #bbb;
// border-color: "#FF000A" ;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: 20px;
`;

// height: 100vh;

export const ConnectionView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const OutView = styled.div`
  margin-left: 2.4em;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
