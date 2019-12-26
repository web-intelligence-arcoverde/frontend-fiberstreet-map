//React
import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";
import { Creators as CableActions } from "../../../../../redux/store/ducks/cabo";
import { Creators as ImportActions } from "../../../../../redux/store/ducks/import";
import AuthActions from "../../../../../redux/store/ducks/auth";

//Componentes @material-ui / react-bootstrap
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Modal, Button, Form
} from "react-bootstrap";

//Componentes criados
import { Container } from "./styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingLeft: "22px",
    paddingTop: "40px"
  },
  paper: {
    position: "absolute",
    top: 36,
    right: 0,
    left: 0
  }
}));

function ImportGeojson(props) {
  const [geojson, setGeojson] = useState('')
  const [layerType, setLayerType] = useState('')
  const { loading, modal: { visible } } = props.imports

  const { importGeojsonRequest, closeImportGeojsonModal } = props;


  function hideModal(){
    closeImportGeojsonModal()
  }

  function handleSubmit(e) {
    e.preventDefault()
    importGeojsonRequest(geojson, layerType)
    setGeojson('')
    setLayerType('')
  }

  return (
    <Modal show={visible} onHide={hideModal}>
      {
        !loading && (
        <Form onSubmit={handleSubmit}>
          <Modal.Header
            style={{
              justifyContent: "center",
              backgroundColor: "#ffc107",
              color: "#6c757d"
            }}
          >
            <Modal.Title>Importar via GEOJSON</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>GeoJSON:</Form.Label>
              <Form.Control
                required
                minLength="5"
                
                as="textarea"
                value={JSON.stringify(geojson)}
                onChange={e => setGeojson(JSON.parse(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo: (CLIENTS, CTOS, CEOS)</Form.Label>
              <Form.Control
                required
                minLength="5"
                type="text"
                value={layerType}
                onChange={e => setLayerType(e.target.value)}
              />
            </Form.Group>
            
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={hideModal}>
              Fechar
            </Button>

            <Button variant="secondary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>)
      }
      { loading && <h4>Enviando...</h4>}
    </Modal>
  );
}

const mapStateToProps = state => ({
  imports: state.imports
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ImportActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportGeojson);

/*
<Dropdown.Item href="#">
                      <Form.Check label="ctos" aria-label="option 1" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <Form.Check label="clientes" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <Form.Check label="ceo" />
                    </Dropdown.Item>
*/
