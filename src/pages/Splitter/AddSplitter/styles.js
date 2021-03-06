import styled from "styled-components";

export const Container = styled.div`
  display: flex;  
  align-items: center,
  justify-content: center,
  border-radius: 4px;
  padding: 20px;
  height: 100vh;
`;

// width: 370px;

export const Button = styled.button`
  color: #fff;
  font-size: 16px;
  background: #429911;
  height: 56px;
  border: 0;
  border-radius: 5px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex: 1 1;
  background: #fff;
  padding: 1.2em;
  flex-direction: column;
  align-items: center;
  label {
    font-weight: bold;
  }
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #429911;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;

export const CoordForm = styled.div`
  display: flex;
  flex-direction: row;
`;

// #fc6963;
