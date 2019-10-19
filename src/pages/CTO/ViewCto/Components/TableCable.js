import React from "react";

//UI-Components
import { Table, Button, Modal } from "react-bootstrap";
import { Container } from "@material-ui/core";

export default function TableSplitter() {
  // const { viewClients } = props.redux.ctos;
  // const { hideModalClients } = props;
  return (
    <Modal>
      <Table responsive>
        <thead>
          <tr style={{ backgroundColor: "#fff", color: "#6E6E6E" }}>
            <th>Nome</th>
            <th>Modelo</th>
            <th>N° Fibras</th>
            <th>Fibra Aliment.</th>
          </tr>
        </thead>

        <tbody></tbody>
      </Table>

      <Button
        style={{ color: "#fff", marginTop: "20px" }}
        variant="warning"
        size="lg"
        block
      >
        Adicionar cabo
      </Button>
    </Modal>
  );
}

/* OBS: chamda da api get/cabos
<tbody>
  {cabos.map(cabo => (
    <tr>
      <td>{cabo.Cabo.nome}</td>
      <td>{cabo.Cabo.tipo}</td>
      <td>{cabo.Cabo.quantidade_fibras}</td>
      <td>Des..</td>
      </tr>
  ))}
</tbody>
*/
