import React, { useState, useEffect } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators redux

// Api

// Ui
import { Modal, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../../../services/api';
import { Creators as FiberFusionActions } from '../../../../redux/store/ducks/fiberfusion';
import { Creators as ceoCreators } from '../../../../redux/store/ducks/ceo';

function ModalFusao(props) {
  const [cables, setCables] = useState([{ value: '', label: '' }]);
  const [fibers, setFibers] = useState([]);

  const [bandeja, setBandeja] = useState('');
  const [cableTo, setCableTo] = useState('');
  const [cableFrom, setCableFrom] = useState('');
  const [fiberTo, setFiberTo] = useState('');
  const [fiberFrom, setFiberFrom] = useState('');
  const [obs, setObs] = useState('');
  const [fiberFusion, setFiberFusion] = useState({
    from: {
      cableId: null,
      fiberId: null,
    },
    to: {
      cableId: null,
      fiberId: null,
    },
  });

  const { visible } = props.redux.ceo.viewNewFusao;

  useEffect(() => {
    if (visible) {
      setFiberFusion({
        from: {
          cableId: null,
          fiberId: null,
        },
        to: {
          cableId: null,
          fiberId: null,
        },
      });
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const { cables } = props.fiberfusion;
      const allOptions = cables.map(({ cable }) => {
        return {
          value: cable.id,
          label: `${cable.name} ${cable.fiberAmount} FO`,
        };
      });
      console.log(allOptions);
      setCables(allOptions);
    }
  }, [props.fiberfusion, visible]);

  useEffect(() => {
    if (typeof fiberFusion.from.cableId === 'number') {
      // const { showFibersCableRequest } = props;
      // showFibersCableRequest(Number(fiberFusion.from.cableId));
      api
        .get(`fibers/cable/${fiberFusion.to.cableId}`)
        .then(response => {
          const { data } = response;
          setFiberFusion({
            ...fiberFusion,
            to: {
              ...fiberFusion.to,
              fibers: data,
            },
          });
        })
        .catch(err => {
          // /
        });
    }
  }, [fiberFusion.from.cableId]);

  useEffect(() => {
    if (typeof fiberFusion.to.cableId === 'number') {
      api
        .get(`fibers/cable/${fiberFusion.to.cableId}`)
        .then(response => {
          const { data } = response;
          setFiberFusion({
            ...fiberFusion,
            to: {
              ...fiberFusion.to,
              fibers: data,
            },
          });
        })
        .catch(err => {
          // /
        });
    }
  }, [fiberFusion.to.cableId]);

  const { hideNewViewModalFusao } = props;

  return (
    <Modal
      sh
      ow={props.redux.ceo.viewNewFusao.visible}
      onHide={hideNewViewModalFusao}
      size="lg"
    >
      <div
        style={{
          justifyContent: 'center',
          fontSize: '30px',
          backgroundColor: '#F7D358',
          paddingTop: '15px',
          paddinBottom: '15px',
        }}
      >
        <h1>Adicionar fusão</h1>
      </div>

      <form>
        <div>
          <label>Bandeja</label>
          <input
            type="text"
            value={bandeja}
            onChange={e => setBandeja(e.target.value)}
          />
        </div>

        <div
          style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}
        >
          <label>Cabo</label>
          <input
            id="standard-select-currency"
            select
            label="Cabo"
            name="asd"
            // className={classes.textField}
            // value={tipo}
            value={fiberFusion.from.cableId || ''}
            // defaultValue={select[0].value}
            onChange={e =>
              setFiberFusion({
                ...fiberFusion,
                from: {
                  ...fiberFusion.from,
                  cableId: e.target.value,
                },
              })
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
          </input>

          <div>
            <label>Fibra</label>
            <input
              as="select"
              value={fiberTo}
              onChange={e => setFiberTo(e.target.value)}
            >
              {/* {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))} */}
            </input>
          </div>

          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              width: '50px',
            }}
          >
            <Button variant="secondary">
              <CloseIcon />
            </Button>
          </div>

          <div>
            <label>Cabo</label>
            <input
              as="select"
              value={cableFrom}
              onChange={e => setCableFrom(e.target.value)}
            >
              {/* {cables.map(cable => (
                    <option>{cable}</option>
                  ))} */}
            </input>
          </div>

          <label>Fibra</label>
          <input
            as="select"
            value={fiberFrom}
            onChange={e => setFiberFrom(e.target.value)}
          >
            {/* {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))} */}
          </input>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <Button variant="secondary" type="submit" style={{ width: '100%' }}>
            Adicionar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
  fiberfusion: state.fiberfusion,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators, ...FiberFusionActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalFusao);
