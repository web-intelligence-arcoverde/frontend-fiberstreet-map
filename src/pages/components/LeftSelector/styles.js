import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 5px;
  top: 50px;
`;

// position: absolute;
// margin: 10px 10px;
// padding: 0px 10px;
export const Button = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  height: auto;
  margin-bottom: 3px;
  border-radius: 4px;
  border: 1px solid;
  img {
    width: 5%;
    padding: 10px;
    margin-bottom: 15px;
  }
  p {
    color: #000;
    background-color: #8123
    padding: 5px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
  }
`;

export const MoreInfo = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
`;

// export const ButtonText = styled.text``
export const ButtonText = styled.p``;
