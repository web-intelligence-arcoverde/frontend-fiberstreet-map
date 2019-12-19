import React, { useEffect, useState } from "react";

//API
import api from "../../../../services/api";

import { Creators as ctosActions } from "../../../../redux/store/ducks/ctos";
import { Creators as MapActions } from "../../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../../redux/store/ducks/cabo";
import { Creators as CoordinatesCreators } from "../../../../redux/store/ducks/coordinates";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//UI-Components
import { Button, Container, Table } from "react-bootstrap";
import Delete from "@material-ui/icons/HighlightOff";

//function
import { positionObject } from "../../../Functions/get-position-object/index";

function ViewCable(props) {
  const { hideViewModalCto } = props;
  const { ctos } = props.redux;
  const { viewCto } = ctos;
  const { data } = viewCto;
  const [cables, setCables] = useState([]);

  function addCable() {
    const {
      showIcons,
      setDelimitation,
      addCoordCabo,
      setSubDelemitation,
      setIdFrom,
      setTypeAndId
    } = props;
    showIcons();
    addCoordCabo(positionObject(data));
    setDelimitation("cabo");
    setSubDelemitation("cto");
    setIdFrom(data.id);
    setTypeAndId("CTO", data.id);
    hideViewModalCto();
  }

  function deleteCable(index) {
    let response = window.prompt(
      "Deseja mesmo deletar? Digite SIM para deletar"
    );
    const { deleteCableRequest } = props;

    if (response === "SIM") {
      deleteCableRequest(index);
      hideViewModalCto();
    }
  }

  useEffect(() => {
    if (viewCto.visible) {
      api.get(`cables/cto/${data.id}`).then(response => {
        const { data } = response;
        setCables(data);
      });
    }
  }, [data.id, viewCto.visible]);

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Cabo</th>
            <th>Quantidade de Fibras</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cables.map((cable, index) => (
            <tr key={index}>
              <td>{cable.cable.name}</td>
              <td>{cable.cable.fiberAmount}</td>
              <td>{cable.cable.obs}</td>
              <td>
                <Button
                  variant="link"
                  style={{
                    borderTopWidth: "0px",
                    paddingTop: "0px",
                    borderLeftWidth: "0px",
                    paddingLeft: "0px",
                    paddingBottom: "0px",
                    paddingRight: "0px",
                    borderRightWidth: "0px",
                    borderBottomWidth: "0px",
                    marginLeft: "5px",
                    marginRight: "5px"
                  }}
                >
                  <Delete
                    style={{ color: "#6c757d" }}
                    onClick={() => deleteCable(cable.cable.id)}
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <Button variant="secondary" onClick={addCable}>
          Adicionar um novo cabo
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...MapActions, ...CaboActions, ...ctosActions, ...CoordinatesCreators },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewCable);
