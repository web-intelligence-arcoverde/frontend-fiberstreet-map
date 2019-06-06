import React, { useState, useEffect } from "react";
import { Container, Form } from "./styles";
import api from "../../../services/api";

export default function AddCto(props) {
  const [name, setName] = useState("oo");
  const [coordinates, setCoordinates] = useState("oo");
  const [type, setType] = useState("oo");
  const [address, setAddress] = useState("oo");

  function handleCto() {
    // api.post('/api/models/cto/create')
    const newCto = {
      name,
      coordinates,
      type,
      address
    };
    api
      .post("/create/cto", newCto) //, newCto)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  return (
    <Container>
      <button onClick={handleCto}>TESTE</button>
      <Form onSubmit={handleCto}>
        <input
          type="text"
          placeholder="Insira o nome da CTO"
          required
          onChange={setName}
        />
        <input
          type="text"
          placeholder="Coordenadas"
          required
          onChange={setCoordinates}
        />
        <input
          type="text"
          placeholder="Endereço"
          required
          onChange={setAddress}
        />
        <input type="text" placeholder="Modelo" required onChange={setType} />
        {/* <p>Lat: {this.props.coordinates.latitude}, Lng: {this.props.coordinates.longitude}</p> */}
        <button type="submit">Adicionar</button>
        <hr />
      </Form>
    </Container>
  );
}
