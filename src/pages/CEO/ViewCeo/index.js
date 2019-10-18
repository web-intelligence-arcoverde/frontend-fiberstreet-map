import React from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators que era para ser usado.
// import { Creators as clientCreators } from "../../../redux/store/ducks/cliente";

//EditComponents
import InputField from "./Components/InputFieldComponent";

//UI-Components
import { Modal, Card, ListGroup, Button } from "react-bootstrap";

function ViewCeo(props) {
  return (
    <>
      <Modal size="lg">
        <Modal.Header
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7D358"
          }}
        >
          <Modal.Title style={{ color: "#585858" }}>
            Caixa de emenda optica
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#FFFFFF" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header
              style={{ backgroundColor: "#D8D8D8", textAlign: "center" }}
            >
              Informações
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <InputField name="Tipo:" atributo="sdf" tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="Modelo:"
                  atributo="111.111.111-11"
                  tipe="text"
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="Endereço:" atributo="1gb" tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="Observação:" atributo="1gb" tipo="text" />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

//Ações
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCeo);
