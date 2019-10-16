import React, { useState } from "react";



//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators que está em uso agora.
import { Creators as ClienteCreators } from "../../../redux/store/ducks/all";

//Creators que era para ser usado.
//import { Creators as CliCreators } from "../../../redux/store/ducks/cliente";

//UI-Components
import {Modal,Row,Container,Col,Button,Form} from 'react-bootstrap';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';

//API
import api, { API } from "../../../services/api";


const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
});





function ViewCliente(props) {
  
  const { viewClient } = props.redux.all;
  
  const { changeClienteData } = props;

  const [splitterId, setSplitterId] = useState("");
  
  const [existsWire, setExistsWire] = useState(true);
 
  const [editar, setEditar] = useState(false);

  const [show, setShow] = useState(false);
  
  const modelCpfClose = () => setShow(false);
 
  const modelCpfShow = () => setShow(true);

  // visibility modal
  const [modalVisible, setModalVisible] = useState([
    {
      nome: 'cpf',
      visible: false
    },
    {
      nome: 'nome',
      visible: false
    },
    {
      nome: 'velocidade',
      visible: false
    },
    {
      nome:'instalacao',
      visible:false
    },
    {
      nome:'pppoe',
      visible:false
    },
  ])

  function handleChangeModalEdition(name) {
    let data = [];
    data = modalVisible.map(modal => modal.nome === name ? {...modal, visible: !modal.visible } : modal );
    setModalVisible(data);
  }

  const classes = useStyles();

  let {
    nome,
    usuario_pppoe,
    cpf,
    velocidade,
    data_instalacao,
    id
  } = viewClient.data;

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  function addCabo() {
    let latitude = JSON.parse(props.redux.all.viewClient.data.coordenadas)
      .latitude;
    let longitude = JSON.parse(props.redux.all.viewClient.data.coordenadas)
      .longitude;
    let coord = [longitude, latitude];
    // alert(coord);

    const {
      addCoordCabo,
      setDelimitacaoMapa,
      hideClientViewModal,
      addClienteId
    } = props;
    setDelimitacaoMapa("cabo");
    let arrayDeArray = new Array(coord);
    // addCoordCabo(coord);
    addClienteId(id);
    addCoordCabo(arrayDeArray);
    hideClientViewModal();
  }

  function handleCoordCabo() {
    api
      .get(`${API.GET_SAIDA_SP_BY_CLIENTE}/${id}`)
      .then(result => {
        const { data } = result;
        console.log(data);
        const { id, splitter_cod } = data;
        setSplitterId(splitter_cod);

        if (splitter_cod) {
          alert("Este cliente já possui um drop em sua residência");
        } else {
          addCabo();
        }
      })
      .catch(err => {
        console.warn(err);
      });
  }

  return (
    
    <Modal show={true} onHide={handleHideModal} >

      <Modal.Header closeButton>
          <h3 style={{marginTop:'10px',color:'#A4A4A4'}}>Informações do usuario</h3>
      </Modal.Header>

      <Modal.Body style={{paddingLeft:'0px',paddingRight:'0px',paddingBottom:'0px',paddingTop:'0px'}}>

        <Paper className={classes.root}>
          
          <MenuList style={{paddingTop: '0px', paddingBottom: '0px'}}>                
                
            <MenuItem 
            onClick={() => handleChangeModalEdition('cpf')} 
            style={{paddingRight: '0px',paddingLeft: '0px',paddingTop: '0px',paddingBottom: '0px'}}>

              <Container>
                  <Row>    
                          
                    <Col sm='4'>
                            
                      <Typography variant="inherit" style={{paddingLeft: '0px',paddingBottom: '0px',paddingRight: '0px',paddingTop: '0px',color:'#FFBF00'}} noWrap>
                        <span>CPF:</span>
                        <h6>{cpf}</h6>
                      </Typography>
                          
                    </Col>                                          

                    <Col sm={7}></Col>    

                    <Col sm={1} style={{ marginTop: '15px' }}>                                           
                          
                      <EditIcon style={{width:'22px',minWidth: '22px', color:'#BDBDBD'}}>
                        <DraftsIcon style={{width:'22px',minWidth: '22px'}}></DraftsIcon>
                      </EditIcon>
                          
                    </Col> 
                        
                  </Row>
                </Container>  
            
            </MenuItem>

            <MenuItem onClick={() => handleChangeModalEdition('nome')} 
                      style={{paddingRight: '0px',paddingLeft: '0px',paddingTop: '0px',paddingBottom: '0px'}}>

              <Container>

                <Row>    
                          
                  <Col sm='4'>
                    
                    <Typography variant="inherit" style={{paddingLeft: '0px',paddingBottom: '0px',paddingRight: '0px',paddingTop: '0px',color:'#FFBF00'}} noWrap>
                      <span>Nome:</span>
                      <h6>{nome}</h6>
                    </Typography>
                          
                  </Col>                                          

                  <Col sm={7}></Col>    

                  <Col sm={1} style={{ marginTop: '15px' }}>                                           
                    <EditIcon style={{width:'22px',minWidth: '22px', color:'#BDBDBD'}}>
                      <DraftsIcon style={{width:'22px',minWidth: '22px'}}></DraftsIcon>
                    </EditIcon>
                  </Col> 
                        
                </Row>

              </Container>

            </MenuItem>

            <MenuItem onClick={() => handleChangeModalEdition('velocidade')}  
                      style={{paddingRight: '0px',paddingLeft: '0px',paddingTop: '0px',paddingBottom: '0px'}}>
                
                <Container>
                  
                  <Row>
                    
                    <Col sm='4'>
                              
                      <Typography variant="inherit" style={{paddingLeft: '0px',paddingBottom: '0px',paddingRight: '0px',paddingTop: '0px',color:'#FFBF00'}} noWrap>
                        <span>Velocidade:</span>
                        <h6>{velocidade}</h6>
                      </Typography>
                            
                    </Col>                                          
    
                    <Col sm={7}></Col>    
    
                    <Col sm={1} style={{ marginTop: '15px' }}>                                           
                      <EditIcon style={{width:'22px',minWidth: '22px', color:'#BDBDBD'}}>
                        <DraftsIcon style={{width:'22px',minWidth: '22px'}}></DraftsIcon>
                      </EditIcon>
                    </Col> 
                          
                    </Row>

                </Container>
            
            </MenuItem>

            <MenuItem onClick={() => handleChangeModalEdition('instalacao')} style={{paddingRight: '0px',paddingLeft: '0px',paddingTop: '0px',paddingBottom: '0px'}}>
              
                <Container>

                  <Row>
                  
                    <Col sm='4'>
                      
                      <Typography variant="inherit" 
                                  style={{paddingLeft: '0px',
                                          paddingBottom: '0px',
                                          paddingRight: '0px',
                                          paddingTop: '0px',
                                          color:'#FFBF00'}} noWrap>
                      
                        <span>Data da instação:</span>
                        <h6>{data_instalacao}</h6>
                              
                      </Typography>
                            
                    </Col>                                          
    
                    <Col sm={7}></Col>    
    
                    <Col sm={1} style={{ marginTop: '15px' }}>                                           
                        <EditIcon style={{width:'22px',minWidth: '22px', color:'#BDBDBD'}}>
                          <DraftsIcon style={{width:'22px',minWidth: '22px'}}></DraftsIcon>
                        </EditIcon>
                    </Col> 
                        
                  </Row>

                </Container>

            </MenuItem>

            <MenuItem onClick={() => handleChangeModalEdition('pppoe')} style={{paddingRight: '0px',paddingLeft: '0px',paddingTop: '0px',paddingBottom: '0px'}}>
                    
                    <Container>
                        
                      <Row>    
                          
                        <Col sm='4'>
                            
                          <Typography variant="inherit" style={{paddingLeft: '0px',paddingBottom: '0px',paddingRight: '0px',paddingTop: '0px',color:'#FFBF00'}} noWrap>
                              
                              <span>PPPOE:</span>
                              <h6>{usuario_pppoe}</h6>
                            
                          </Typography>
                          
                        </Col>                                          
  
                        <Col sm={7}></Col>    
  
                        <Col sm={1} style={{ marginTop: '15px' }}>                                           
                          
                        <EditIcon style={{width:'22px',minWidth: '22px', color:'#BDBDBD'}}>
                          <DraftsIcon style={{width:'22px',minWidth: '22px'}}></DraftsIcon>
                        </EditIcon>
                          
                        
                        </Col> 
                        
                      </Row>
                    
                    </Container>
                      
                  </MenuItem>
   
          </MenuList>

            <Container>

                <Modal 
                  show={modalVisible[0].visible} 
                  onHide={() => handleChangeModalEdition('cpf')}
                >

                  <Modal.Header>
                    <Modal.Title>Alterar CPF</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                          
                    <Form.Group>
                      <Form.Label>CPF:</Form.Label>
                      <Form.Control type="text" value={cpf}/>
                    </Form.Group>
                        
                  </Modal.Body>
                        
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleChangeModalEdition('cpf')}>
                      Cancelar
                    </Button>
                          
                    <Button variant="primary" onClick={() => handleChangeModalEdition('cpf')}>
                      Salvar
                    </Button>                        
                  </Modal.Footer>
                      
                </Modal>

              </Container>

              <Container>

              <Modal  show={modalVisible[1].visible} 
                      onHide={() => handleChangeModalEdition('nome')}>
                      
                <Modal.Header>
                  <Modal.Title>Alterar nome</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        
                  <Form.Group>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" value={nome} onChange={ e => {
                                                                      nome = e.target.value;
                                                                      changeClienteData({
                                                                        nome: e.target.value,
                                                                        ...viewClient.data
                                                                      });
                    }}/>
                  </Form.Group>
                      
                </Modal.Body>
                      
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleChangeModalEdition('nome')}>
                    Cancelar
                  </Button>
                        
                  <Button variant="primary" onClick={() => handleChangeModalEdition('nome')}>
                    Salvar
                  </Button>
                      
                </Modal.Footer>
                    
              </Modal>
            </Container>

            <Container>
                <Modal  show={modalVisible[2].visible} 
                        onHide={() => handleChangeModalEdition('velocidade')}>
                  <Modal.Header>
                    <Modal.Title>Alterar velocidade</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form.Group>
                      <Form.Label>velocidade:</Form.Label>
                      <Form.Control type="text" value={velocidade}/>
                    </Form.Group>
                  </Modal.Body>
                      
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleChangeModalEdition('velocidade')}>
                      Cancelar
                    </Button>
                    
                    <Button variant="primary" onClick={() => handleChangeModalEdition('velocidade')}>
                      Salvar
                    </Button>
                  </Modal.Footer>

                </Modal>
              </Container>

              <Container>
                
                <Modal show={modalVisible[3].visible} 
                      onHide={() => handleChangeModalEdition('instalacao')}>
                      
                  <Modal.Header>
                    <Modal.Title>Alterar data de instalação</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                        
                    <Form.Group>
                      <Form.Label>Data de instalaçao:</Form.Label>
                      <Form.Control type="date" value={data_instalacao}/>
                    </Form.Group>
                      
                  </Modal.Body>
                      
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleChangeModalEdition('instalacao')}>
                      Cancelar
                    </Button>
                    
                    <Button variant="primary" onClick={() => handleChangeModalEdition('instalacao')}>
                      Salvar
                    </Button>
                  </Modal.Footer>

                </Modal>
              </Container>


              <Container>
              <Modal  show={modalVisible[4].visible} 
                      onHide={() => handleChangeModalEdition('pppoe')}>
                      
                        <Modal.Header>
                          <Modal.Title>Alterar PPOE</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          
                          <Form.Group>
                            <Form.Label>PPPOE</Form.Label>
                            <Form.Control type="text" value={usuario_pppoe}/>
                          </Form.Group>
                        
                        </Modal.Body>
                        
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => handleChangeModalEdition('pppoe')}>
                            Cancelar
                          </Button>
                          <Button variant="primary" onClick={() => handleChangeModalEdition('pppoe')}>
                            Salvar
                          </Button>
                        </Modal.Footer>

                      </Modal>
                    </Container>
        
        </Paper>

      <Modal.Footer>
      <Button variant="warning" style={{color:'#F2F2F2'}} onClick={handleCoordCabo}>
        Adicionar cabo
      </Button>
      </Modal.Footer>


      </Modal.Body>
   
    </Modal> 
          
    
  );

}

const mapStateToProps = state => ({
  redux: state
});


//Ações
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ClienteCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCliente);
