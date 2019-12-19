import React from "react";

//UI-Components
import { Form, Button, Col } from "react-bootstrap";

//Icons
import Cable from "@material-ui/icons/SettingsInputHdmi";

//

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

export default function tableSplitter(props) {
  var balancing = 8;

  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome do splitter:</Form.Label>
            <Form.Control required minLength="5" type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo do Splitter</Form.Label>
            <Form.Control required minLength="5" type="text" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Balanceamento:</Form.Label>
            <Form.Control required type="number" />
          </Form.Group>
        </Form.Row>
        <div
          style={{
            border: "1px solid #6c757d",
            display: "flex",
            flexWrap: "wrap",
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
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <Button variant="info" style={{ marginRight: "10px" }}>
            Atualizar informações
          </Button>
          <Button variant="danger"> Excluir</Button>
        </div>
      </Form>
    </>
  );
}
