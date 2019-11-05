import React from "react";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ceoCreators } from "../../../../redux/store/ducks/ceo";
import { Creators as mapCreators } from "../../../../redux/store/ducks/map";
import { Creators as cableCreators } from "../../../../redux/store/ducks/cabo";

//UI-Components
import { Button, Container, Table } from "react-bootstrap";
import Delete from "@material-ui/icons/HighlightOff";

function ViewFusoes(props) {
  console.log("Informações cable");

  const { data } = props.redux.ceo.viewCeo;

  const { hideViewModalCeo } = props;

  const { cables } = props.fiberfusion;

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
    setSubDelemitation("ceo"); // map - map.delimitacao
    let arrayDeArray = new Array(coord);
    addCoordCabo(arrayDeArray); // map - map.polyline
    setIdFrom(data.id); // cabo - cabo.id
    hideViewModalCeo();
  }

  function deleteCable(index) {
    console.log(index);
  }

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            {/* <th>Bandeja</th> */}
            <th>Cabo</th>
            {/* <th>Fibra</th> */}
            {/* <th style={{ textAlign: "center" }}>x</th> */}
            <th>Quantidade de Fibras</th>
            {/* <th>Cabo</th> */}
            <th>Observação</th>
            {/* <th>Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {cables.map((cable, index) => (
            <tr>
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
                    onClick={deleteCable(index)}
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
        <Button variant="secondary" style={{ width: "100%" }} onClick={addCabo}>
          Adicionar um novo cabo
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
  fiberfusion: state.fiberfusion
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ceoCreators, ...mapCreators, ...cableCreators },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFusoes);
