import React, { useState, useEffect } from "react";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ceoCreators } from "../../../../redux/store/ducks/ceo";
import { Creators as FiberFusionActions } from "../../../../redux/store/ducks/fiberfusion";

// Api
import api from '../../../../services/api'

//Ui
import { Modal, Form, Button, Col } from "react-bootstrap/";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

function ModalFusao(props) {
  const [cables, setCables] = useState([{ value: "", label: "" }]);
  const [fibers, setFibers] = useState([]);

  const [bandeja, setBandeja] = useState("");
  const [cableTo, setCableTo] = useState("");
  const [cableFrom, setCableFrom] = useState("");
  const [fiberTo, setFiberTo] = useState("");
  const [fiberFrom, setFiberFrom] = useState("");
  const [obs, setObs] = useState("");
  const [fiberFusion, setFiberFusion] = useState({
    from: {
      cableId: null,
      fiberId: null
    },
    to: {
      cableId: null,
      fiberId: null
    }
  });

  const { visible } = props.redux.ceo.viewNewFusao;

  useEffect(() => {
    if (visible) {
      setFiberFusion({
        from: {
          cableId: null,
          fiberId: null
        },
        to: {
          cableId: null,
          fiberId: null
        }
      });
    }
  }, [visible]);
  // useEffect(() => {
  //   const { showCablesCeoRequest } = props;
  //   const { data } = props.redux.ceo.viewCeo;
  //   if (props.redux.ceo.viewNewFusao.visible) {
  //     showCablesCeoRequest(data.id);
  //   }
  // }, [props, visible]);

  useEffect(() => {
    if (visible) {
      const { cables } = props.fiberfusion;
      let allOptions = cables.map(({ cable }) => {
        return {
          value: cable.id,
          label: `${cable.name} ${cable.fiberAmount} FO`
        };
      });
      console.log(allOptions);
      setCables(allOptions);
    }
  }, [props.fiberfusion, visible]);

  useEffect(() => {
    if (typeof fiberFusion.from.cableId === "number") {
      // const { showFibersCableRequest } = props;
      // showFibersCableRequest(Number(fiberFusion.from.cableId));
      api.get(`fibers/cable/${fiberFusion.to.cableId}`)
        .then(response => {
          const { data } = response;
          setFiberFusion({
            ...fiberFusion,
            to: {
              ...fiberFusion.to,
              fibers: data
            }
          })
        }).catch(err => {
          ///
        })
    }

  }, [fiberFusion.from.cableId]);

  useEffect(() => {
    if (typeof fiberFusion.to.cableId === 'number') {
      api.get(`fibers/cable/${fiberFusion.to.cableId}`)
        .then(response => {
          const { data } = response;
          setFiberFusion({
            ...fiberFusion,
            to: {
              ...fiberFusion.to,
              fibers: data
            }
          })
        }).catch(err => {
          ///
        })
    }
  }, [fiberFusion.to.cableId])

  const { hideNewViewModalFusao } = props;

  return (
    <Modal
      sh
      ow={props.redux.ceo.viewNewFusao.visible}
      onHide={hideNewViewModalFusao}
      size="lg"
    >
      <Modal.Header
        style={{
          justifyContent: "center",
          fontSize: "30px",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddinBottom: "15px"
        }}
      >
        <Modal.Title>Adicionar fusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Bandeja</Form.Label>
              <Form.Control
                type="text"
                value={bandeja}
                onChange={e => setBandeja(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <div
            style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
          >
            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginRight: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Cabo"
                  name="asd"
                  // className={classes.textField}
                  // value={tipo}
                  value={fiberFusion.from.cableId || ""}
                  // defaultValue={select[0].value}
                  onChange={e =>
                    setFiberFusion({
                      ...fiberFusion,
                      from: {
                        ...fiberFusion.from,
                        cableId: e.target.value
                      }
                    })
                  }
                  SelectProps={
                    {
                      // MenuProps: {
                      //   className: classes.menu
                      // }
                    }
                  }
                  helperText="Selecione o cabo 1 da fusão"
                  margin="normal"
                  required
                >
                  {cables.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <Form.Control
                  as="select"
                  value={cableTo}
                  onChange={e => setCableTo(e.target.value)}
                > */}
                {/* {cables.map(cable => (
                    <option>{cable}</option>
                  ))} */}
                {/* {props.fiberfusion.cables.map(cable => (
                    <option>
                      {cable.cable.name} {cable.cable.id}
                    </option>
                  ))} */}
                {/* {
                    () => console.log(props)
                  } */}
                {/* </Form.Control> */}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control
                  as="select"
                  value={fiberTo}
                  onChange={e => setFiberTo(e.target.value)}
                >
                  {/* {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))} */}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                width: "50px"
              }}
            >
              <Button variant="secondary">
                <CloseIcon />
              </Button>
            </div>

            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginLeft: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <Form.Control
                  as="select"
                  value={cableFrom}
                  onChange={e => setCableFrom(e.target.value)}
                >
                  {/* {cables.map(cable => (
                    <option>{cable}</option>
                  ))} */}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control
                  as="select"
                  value={fiberFrom}
                  onChange={e => setFiberFrom(e.target.value)}
                >
                  {/* {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))} */}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Button variant="secondary" type="submit" style={{ width: "100%" }}>
              Adicionar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
  fiberfusion: state.fiberfusion
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators, ...FiberFusionActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalFusao);
