import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Cto from "../../assets/images/CTO_24x24.png";
import Cliente from "../../assets/images/cliente com24x12.png";
import { Layer, Feature } from "react-mapbox-gl";
import PolylineOverlay from "../components/PolylineOverlay";
// import { Polyline } from 'react-leaflet';
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { LineLayer } from "@deck.gl/layers";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import api from "../../services/api";
// import { MapController } from '../../controllers/MapController'
import * as Actions from "../../redux/store/actions/all";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

class Maps extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -27.2108001,
      longitude: -49.6446024,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    markers: [],
    cto: [],
    latitude: "",
    longitude: "",
    captureClick: true,
    modeCapture: "addCto"
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
    this.obterDadosDoServidor();
  }

  componentWillUnmount() {
    window.addEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  /** Obtém os dados do servidor e armazena no redux para mostrar no mapa */
  async obterDadosDoServidor() {
    const { setCtoFromServer } = this.props;
    let information = {
      type: "cto"
    };
    await api
      .post("/get/cto", information)
      .then(result => {
        let data = result.data;
        // this.state.cto = data;
        setCtoFromServer(data);
        console.warn(this.props);
      })
      .catch(err => {
        console.warn(err);
      });
    await this.obterClientes();
  }

  async obterClientes() {
    const { setClientFromServer } = this.props;
    await api
      .post("/get/cliente")
      .then(result => {
        let data = result.data;
        // alert(JSON.stringify(data));
        setClientFromServer(data);
        this.obterCabos();
      })
      .catch(err => {
        console.warn(err);
      });
  }

  async obterCabos() {
    const { setPolylinesFromServer } = this.props;
    await api
      .get("/cabo/get")
      .then(result => {
        let data = result.data;
        let arrayDados = data.map(dado => {
          //console.tron.log({ Coordenadas: JSON.stringify(dado.coordenadas) });
          //console.tron.log(JSON.parse(dado.coordenadas));
          let coord = JSON.parse(dado.coordenadas);
          let arrayDeLocalizacao = coord.map(dado => {
            return [dado.longitude, dado.latitude];
          });
          //console.tron.log(arrayDeLocalizacao)

          return {
            ...dado,
            coordenadas: arrayDeLocalizacao
          };
        });

        console.tron.log(arrayDados);
        setPolylinesFromServer(arrayDados);
      })
      .catch(err => console.tron.warn(err));
  }

  /**
   *
   * @param {*} delimitacao Tipo de marcação para o mapa
   * recebe valores ( 'marker', 'polyline')
   * Altera a delimitação de marcação no mapa
   *
   */
  alterarDelimitacao(delimitacao) {
    this.setState({ delimitacaoSelecionada: delimitacao });
  }

  /**
   * Verifica o tipo de delimitação selecionada,
   * adiciona o tipo de marcador selecionado nas coordenadas no mapa selecionada
   * @param coordinates coordenadas selecionadas no mapa
   * */
  verificaTipoDelimitacao(coordinates) {
    const { mapa } = this.props.redux;

    switch (mapa.delimitacao) {
      case "cto":
        this.openModal(coordinates);
        break;
      case "ceo":
        break;
      case "splitter":
        break;
      case "cliente":
        this.openModalAddClient(coordinates);
        break;
      case "fibra":
        break;
      case "cabo":
        this.addCoordenadasCabo(coordinates);
        break;
      default:
        break;
    }
  }

  /** Adiciona coordenadas ao JSON de coordenadas de polyline contido no redux store
   * mapa.polyline - REDUX
   */
  addCoordenadasCabo(coordenadas) {
    const { addCoordCabo } = this.props;
    const { polyline } = this.props.redux.mapa;
    let newPolyline = [
      ...polyline,
      [coordenadas.longitude, coordenadas.latitude]
    ];
    console.tron.log({ LINES: newPolyline });

    addCoordCabo(newPolyline);
  }

  /** Verifica como está o modo de captura e realiza ações de acordo com tal */
  verifyModeCapture() {
    switch (this.state.modeCapture) {
      case "ADD_CTO": {
        this.state.modalCto = true;
        this.handleModeCapture("DISABLE_CAPTURE");
      }
    }
  }

  handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;

    const { addCoordenadas, canAddCoordenadas } = this.props;
    const canAdd = this.props.redux.canAddCoordenadas;

    this.state.coordinates = JSON.stringify({
      longitude: longitude,
      latitude: latitude
    });
    addCoordenadas({ longitude: longitude, latitude: latitude });
    canAddCoordenadas(false);

    // ADD CTO per Click
    // this.setState({
    //   markers: [...this.state.markers, { latitude, longitude }]
    // });

    let coordinates = {
      latitude: latitude,
      longitude: longitude
    };

    this.verificaTipoDelimitacao(coordinates);
  };

  async openModal(coordinates) {
    const { showModalCto, setDelimitacaoMapa } = this.props;
    await showModalCto(coordinates);
    setDelimitacaoMapa("default");
  }

  async openModalAddClient(coordinates) {
    const { showAddClienteModal, setDelimitacaoMapa } = this.props;
    await showAddClienteModal(coordinates);
    setDelimitacaoMapa("default");
  }

  getCtos() {
    const { mapa } = this.props.redux;
    this.state.cto = mapa.cto;
  }

  renderVariousMarkers() {
    return this.state.markers.map((marker, index) => (
      <Marker
        key={index}
        latitude={marker.latitude}
        longitude={marker.longitude}
        onClick={this.handleMapClick}
        captureClick={true}
      >
        <img
          style={{
            width: 24,
            height: 24
          }}
          src={Cto}
        />
      </Marker>
    ));
  }

  async renderCto() {
    let myCtos = [];
    await api
      .post("/get/cto")
      .then(result => {
        let data = result.data;
        console.log("RESULTADO");
        console.log(data);
        this.state.cto = data;
        myCtos = data;
      })
      .catch(err => {
        console.warn(err);
      });
  }

  async renderCliente() {
    let myClients = [];
    await api
      .post("/get/cliente")
      .then(result => {
        let data = result.data;
        this.state.cliente = data;
      })
      .catch(err => {
        console.warn(err);
      });
  }

  addLines = () => {
    return (
      <PolylineOverlay
        points={[
          [-122.48369693756104, 37.83381888486939],
          [116.48348236083984, 37.83317489144141]
        ]}
      />
    );
  };
  renderAtualPolylineRedux = () => (
    <PolylineOverlay points={this.props.redux.mapa.polyline} />
  );

  renderMarker() {
    if (this.state.latitude != "") {
      return (
        <Marker
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          onClick={this.handleMapClick}
          captureClick={this.state.captureClick}
          id={"map"}
          ref={"map"}
          onLoad={this.addLines}
        >
          <img
            style={{
              borderRadius: 100,
              width: 48,
              height: 48
            }}
            src="https://avatars2.githubusercontent.com/u/2254731?v=4"
          />
        </Marker>
      );
    }
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
    this._resize();
  }

  

  _onMapLoad() {
    const map = this.state.map;
    const deck = this._deck;
    // console.tron.log(thiss)
    alert('a')
    console.tron.log(this.state)
  }
  

  render() {
    
    return (
      <Container>
        <ReactMapGL
          
          onLoad={() => this._onMapLoad()}
          {...this.state.viewport}
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          onClick={this.handleMapClick}
          
          
          // mapStyle="mapbox://styles/mapbox/dark-v9"
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => {
            // this.setState({ viewport });
            this.state.viewport = viewport;
            this._resize();
          }}
        >
        
          {this.renderVariousMarkers()}
          {this.addLines()}
          {this.renderAtualPolylineRedux()}

          {this.props.redux.mapa.cto.map((cto, index) => {
            let latitude = JSON.parse(cto.coordenadas).latitude;
            let longitude = JSON.parse(cto.coordenadas).longitude;
            return (
              <Marker
                key={index}
                latitude={latitude}
                longitude={longitude}
                captureClick
              >
                <img
                  onClick={() => {
                    if (this.props.redux.mapa.delimitacao === "cabo") {
                      const {
                        addCoordCabo,
                        setDelimitacaoMapa,
                        showAddCaboModal
                      } = this.props;
                      const { polyline } = this.props.redux.mapa;
                      let newPolyline = [...polyline, [longitude, latitude]];

                      addCoordCabo(newPolyline);
                      showAddCaboModal();
                      setDelimitacaoMapa("default");
                    } else {
                      const { showDataInViewModal } = this.props;

                      showDataInViewModal(cto);
                    }
                  }}
                  style={{
                    width: 24,
                    height: 24
                  }}
                  src={Cto}
                />
              </Marker>
            );
          })}
          {this.props.redux.mapa.cliente.map((cliente, index) => {
            return (
              <Marker
                key={index}
                latitude={JSON.parse(cliente.coordenadas).latitude}
                longitude={JSON.parse(cliente.coordenadas).longitude}
                captureClick
              >
                <img
                  onClick={async () => {
                    // alert(JSON.stringify(cliente));
                    // const { showDataInViewModal } = this.props;
                    // await showDataInViewModal(cliente);
                    const { showClientViewModal } = this.props;
                    await showClientViewModal(cliente);
                  }}
                  style={{
                    width: 24,
                    height: 24
                  }}
                  src={Cliente}
                />
              </Marker>
            );
          })}

          {/* {this.props.redux.mapa.cabos.map(cabo => {
          return(
            // <PolylineOverlay
            //   points={cabo.coordenadas}
            // />
          )
        })} */}

          <Button />
          <div style={{ position: "absolute", right: 5, top: 5 }}>
            <NavigationControl />
          </div>
          {/* <DeckGL
        ref={ref => {
          this._deck = ref && ref.deck;
        }}
        onWebGLInitialized={this._onWebGLInitialized}
        layers={layers}
        initialViewState={{
          latitude: -35.280937,
          longitude: 149.130005,
          zoom: 13,
          pitch: 0,
          bearing: 0
        }}
        controller={true}
      >
          </DeckGL> */}
        </ReactMapGL>
        
      </Container>
    );
  }
}

const DimensionedMap = Dimensions()(Maps);

const Map = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maps);
// export default Map
// export default connect(mapStateToProps, mapDispatchToProps)(Map)
