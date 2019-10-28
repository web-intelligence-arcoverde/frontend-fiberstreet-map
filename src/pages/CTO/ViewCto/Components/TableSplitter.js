import React, { useState, useEffect } from "react";

//UI-Components
import { Form, Button, Modal, Col } from "react-bootstrap";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import api from "../../../../services/api";

//Creators
import { Creators as SplitterActions } from "../../../../redux/store/ducks/splitter";
import { Creators as CtoActions } from "../../../../redux/store/ducks/ctos";

import StorageIcon from "@material-ui/icons/Storage";
import { Container } from "@material-ui/core";
import Cable from "@material-ui/icons/SettingsInputHdmi";
import { wrap } from "module";
import { width } from "@material-ui/system";

function TableSplitter(props) {
  const { modalNewSplitter } = props.redux.splitter;

  const { data, visible } = props.redux.ctos.viewCto;

  const [splitters, setSplitters] = useState([]);
  const { hideViewModalCto } = props;

  const [name, setName] = useState("");
  const [modal, setModal] = useState("");
  const [balancing, setBalancing] = useState("");
  const [fib, setFib] = useState("");

  var cores = [
    "#58D3F7",
    "#6E6E6E",
    "#FF00BF",
    "#0101DF",
    "#04B4AE",
    "#F7FE2E",
    "#000000",
    "#01A9DB",
    "#FF0000",
    "#01DF74",
    "#F781F3",
    "#A9A9F5",
    "#0B4C5F",
    "#D8D8D8",
    "#A901DB",
    "#81F7BE"
  ];

  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/splittercto/${id}`)
        .then(response => {
          const sp = response.data;
          sp.map(
            splitter => (
              setName(splitter.name),
              setModal(splitter.model),
              setBalancing(splitter.balancing)
            )
          );
          setSplitters(sp);
        })
        .catch(e => console.warn(e));
    }
    if (visible) getSplitters(data.id);
  }, [data.id, visible]);

  function handleAddSplitter() {
    const { showSplitterAddModal } = props;
    showSplitterAddModal(data.id);
  }

  const { viewSplitter } = props.redux.ctos;
  const { hideModalSplitter } = props;

  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome do splitter:</Form.Label>
            <Form.Control
              required
              minLength="5"
              value={name}
              type="text"
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo do Splitter</Form.Label>
            <Form.Control
              required
              minLength="5"
              type="text"
              value={modal}
              onChange={e => setModal(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Balanceamento:</Form.Label>
            <Form.Control
              required
              type="number"
              value={balancing}
              onChange={e => setBalancing(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Container
          style={{
            border: "1px solid #6c757d",
            display: "flex",
            flexWrap: wrap,
            paddingLeft: "0px",
            paddingRight: "0px",
            marginBottom: "10px"
          }}
        >
          <div>
            {cores.map((cor, index) =>
              balancing == 8
                ? index < 9 && (
                    <Button
                      key={index}
                      variant="secondary"
                      style={{
                        flex: 1,
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        backgroundColor: cores[index]
                      }}
                    >
                      <Cable />
                    </Button>
                  )
                : balancing == 16 &&
                  index < 17 && (
                    <Button
                      key={index}
                      variant="secondary"
                      style={{
                        flex: 1,
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        backgroundColor: cores[index]
                      }}
                    >
                      <Cable />
                    </Button>
                  )
            )}
          </div>
        </Container>
      </Form>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...SplitterActions,
      ...CtoActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitter);

/**
 * 
 * <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Fibra de alimentação:</Form.Label>
            <Form.Control
              required
              type="text"
              value={fib}
              onChange={e => setFib(e.target.value)}
            />
          </Form.Group>
          <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "40px"
          }}
        >
          <Button variant="info" type="submit" style={{ marginRight: "10px" }}>
            Atualizar informações
          </Button>
          <Button variant="danger" style={{ marginRight: "10px" }}>
            Excluir
          </Button>
        </div>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Balanceamento:</Form.Label>
            <Form.Control
              required
              type="number"
              value={balancing}
              onChange={e => setBalancing(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
 */

/**
  * <Button
              variant="secondary"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <Cable />
            </Button>
            <Button
              variant="success"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <Cable />
            </Button>
            <Button
              variant="info"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <Cable />
            </Button>
            <Button
              variant="danger"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <Cable />
            </Button>
            <Button
              variant="primary"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <Cable />
            </Button>
  */
