import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Routes from "./routes";
import GlobalStyle from "./styles/global";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { muiTheme } from "./themes";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

const App = () => {
  return (
    <>
      <MuiThemeProvider muiTheme={muiTheme}>
        <GlobalStyle />
        <Routes />
      </MuiThemeProvider>
    </>
  );
};
export default App;

// "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczZ3pmbTMxN2JsNDNxcWRkcW42emFwIn0.kUT-gbVGUsufpAxksU5L0Q";

// class Map extends Component {
//   static propTypes = {
//     containerWidth: PropTypes.number.isRequired,
//     containerHeight: PropTypes.number.isRequired
//   };

//   state = {
//     viewport: {
//       width: window.innerWidth,
//       height: window.innerHeight,
//       latitude: -27.2108001,
//       longitude: -49.6446024,
//       zoom: 12.8,
//       bearing: 0,
//       pitch: 0
//     }
//   };

//   componentDidMount() {
//     window.addEventListener("resize", this._resize);
//     this._resize();
//   }

//   componentWillUnmount() {
//     window.addEventListener("resize", this._resize);
//   }

//   _resize = () => {
//     this.setState({
//       viewport: {
//         ...this.state.viewport,
//         width: window.innerWidth,
//         height: window.innerHeight
//       }
//     });
//   };

//   render() {
//     const { containerWidth: width, containerHeight: height } = this.props;

//     return (
//       <Container>
//         <ReactMapGL
//           width={this.state.viewport.width}
//           height={this.state.viewport.height}
//           {...this.state.viewport}
//           mapStyle="mapbox://styles/mapbox/dark-v9"
//           mapboxApiAccessToken={TOKEN}
//           onViewportChange={viewport => {
//             this.setState({ viewport });
//             this._resize();
//           }}
//         >
//           <Button />
//           <div style={{ position: "absolute", right: 5, top: 5 }}>
//             <NavigationControl />
//           </div>
//         </ReactMapGL>
//       </Container>
//     );
//   }
// }

// const DimensionedMap = Dimensions()(Map);

// const App = () => (
//   <Container>
//     <DimensionedMap />
//   </Container>
// );

// export default App;
