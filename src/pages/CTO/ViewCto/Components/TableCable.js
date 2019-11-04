import React from "react";

import { Creators as ctosActions } from "../../../../redux/store/ducks/ctos";
import { Creators as MapActions } from "../../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../../redux/store/ducks/cabo";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//UI-Components
import { Button, Modal, Container, Table } from "react-bootstrap";
import Cable from "@material-ui/icons/SettingsInputComponent";
import { Edit } from "@material-ui/icons";
import Delete from "@material-ui/icons/HighlightOff";

function viewCable(props) {
  console.log("Informações cable");
  console.log(props);

  const { showModalOutputCables } = props;

  const { ctos } = props.redux;
  const { hideViewModalCto } = props;

  const { viewCto } = ctos; //Recuperando o estado inicial da CTO
  const { data } = viewCto;

  function open() {
    showModalOutputCables();
  }

  function addCabo() {
    let latitude;
    let longitude;
    try {
      latitude = JSON.parse(data.coordinates).latitude;
      longitude = JSON.parse(data.coordinates).longitude;
    } catch (err) {
      latitude = data.coordinates.latitude;
      longitude = data.coordinates.longitude;
    }

    let coord = [longitude, latitude];

    const {
      addCoordCabo, // setPolyline
      setSubDelemitation,
      setIdFrom,
      setDelimitation
    } = props;

    setDelimitation("cabo");
    setSubDelemitation("cto"); // map - map.delimitacao
    setIdFrom(data.id);
    let arrayDeArray = new Array(coord);
    addCoordCabo(arrayDeArray); // map - map.polyline
    setIdFrom(data.id); // cabo - cabo.id
    hideViewModalCto();
  }

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Obs</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Exemplo</td>
            <td>Exemplo</td>
            <td>eofwpoefkweokf</td>
            <td>8</td>
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
                <Delete style={{ color: "#6c757d" }} />
              </Button>
            </td>
          </tr>
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
        <Button variant="secondary" onClick={addCabo}>
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
    { ...MapActions, ...CaboActions, ...ctosActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(viewCable);

/**
 * 
 * <Button
                variant="link"
                style={{
                  borderTopWidth: "0px",
                  paddingTop: "0px",
                  borderLeftWidth: "0px",
                  paddingLeft: "0px",
                  paddingBottom: "0px",
                  paddingRight: "0px",
                  borderRightWidth: "0px",
                  borderBottomWidth: "0px"
                }}
              >
                <Edit style={{ color: "#6c757d" }} />
              </Button>
 */
