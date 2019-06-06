import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Cto from "../../assets/images/CTO_24x24.png";
import AddCto from "../components/AddCto";
import LeftSelector from "../components/LeftSelector";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../redux/store/actions/all'
// import * as Actions from '../'

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
    latitude: "",
    longitude: "",
    captureClick: true,
    modeCapture: "addCto"
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
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
    // const delimitacaoSelecionada = this.props.redux;
    // const { modalCto } = this.props.redux;
    // try{alert(this.props.redux.modalCto)}catch(e){}
    console.log(this.props)
    switch (this.state.delimitacaoSelecionada) {
      case "addCto":
        this.openModal(coordinates);
        this.state.delimitacaoSelecionada = "DISABLED";
        // this.state.captureClick = false;
        break;
      case "polyline":
        // this.desenharPolyline(coordinates);
        //case 'polyline': this.addPolyline(coordinates)
        break;
      case "circle":
        // this.desenharCircle(coordinates);
        break;
      case "polygon":
        // this.desenharPolygon(coordinates);
        break;
      default:
        break;
    }
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
    // this.setState({ latitude, longitude });

    // if (this.state.modalCto == true) {
    //   this.setState({
    //     markers: [...this.state.markers, { latitude, longitude }]
    //   });
    //   alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // }

    let coordinates = {
      latitude: latitude,
      longitude: longitude
    };
    this.verificaTipoDelimitacao(coordinates);
  };

  openModal(coordinates) {
    this.setState({
      modalCto: !this.state.modalCto,
      coordinates: coordinates,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
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
            // borderRadius: 100,
            width: 24, //48,
            height: 24 //48
          }}
          // src="https://avatars2.githubusercontent.com/u/2254731?v=4"
          src={Cto}
        />
      </Marker>
    ));
  }
  renderModalCto() {
    // if (this.state.modalCto == true) {
    if(this.props.redux.modalCto == true){
      return <AddCto coordinates={this.state.coordinates} />;
    }
  }

  renderMarker() {
    if (this.state.latitude != "") {
      return (
        <Marker
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          onClick={this.handleMapClick}
          // captureClick={true}
          captureClick={this.state.captureClick}
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

  render() {
    const { containerWidth: width, containerHeight: height } = this.props;

    return (
      <Container>
        <ReactMapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          onClick={this.handleMapClick}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => {
            // this.setState({ viewport });
            this.state.viewport = viewport;
            this._resize();
          }}
        >
          {/* {this.renderMarker()} */}
          {this.renderVariousMarkers()}
          {this.renderModalCto()}
          <LeftSelector />

          <Button />
          <div style={{ position: "absolute", right: 5, top: 5 }}>
            <NavigationControl />
          </div>
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
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Maps)
// export default Map
// export default connect(mapStateToProps, mapDispatchToProps)(Map)
