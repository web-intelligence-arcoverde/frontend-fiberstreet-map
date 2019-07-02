// import React, { Component } from "react";

// import PropTypes from "prop-types";

// import mapboxgl from "mapbox-gl";

// import "./map.css";

// import Button from "./button";

// class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       center: [-74.5, 40]
//     };
//     this.handleMap = this.handleMap.bind(this);
//     this.handlePosition = this.handlePosition.bind(this);
//     this.handleFlyToAPosition = this.handleFlyToAPosition.bind(this);
//   }

//   componentDidMount() {
//     const { container, style, zoom, accessToken } = this.props;
//     const { center } = this.state;
//     this.handleMap(container, style, center, zoom, accessToken);
//     this.handlePosition();
//   }

//   handleMap(container, style, center, zoom, accessToken) {
//     mapboxgl.accessToken = accessToken;
//     const map = new mapboxgl.Map({
//       container: container,
//       style: style,
//       center: center,
//       zoom: zoom
//     });
//     this.setState({
//       map: map
//     });
//   }

//   handlePosition() {
//     const options = {
//       enableHighAccuracy: true
//     };
//     navigator.geolocation.getCurrentPosition(
//       pos => {
//         const center = [pos.coords.longitude, pos.coords.latitude];
//         this.setState({
//           center: center
//         });
//       },
//       err => {
//         console.log(err);
//       },
//       options
//     );
//   }

//   handleFlyToAPosition() {
//     const { center, map } = this.state;
//     map.flyTo({
//       center: center
//     });
//     this.addLayerToMap();
//   }

//   addLayerToMap() {
//     const { map } = this.state;
//     let route = [
//       [-122.48369693756104, 37.83381888486939],
//       [116.48348236083984, 37.83317489144141]
//     ];
//     let geojson = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "LineString",
//         coordinates: route
//       }
//     };
//     map.addLayer({
//       id: "route",
//       type: "line",
//       source: {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           properties: {},
//           geometry: {
//             type: "LineString",
//             coordinates: route //geojson
//           }
//         }
//       },
//       layout: {
//         "line-join": "round",
//         "line-cap": "round"
//       },
//       paint: {
//         "line-color": "#2287be",
//         "line-width": 5,
//         "line-opacity": 0.75
//       }
//     });
//     let start = [-122.662323, 45.523751];
//     // map.addLayer({
//     //   id: "point",
//     //   type: "circle",
//     //   source: {
//     //     type: "geojson",
//     //     data: {
//     //       type: "FeatureCollection",
//     //       features: [
//     //         {
//     //           type: "Feature",
//     //           properties: {},
//     //           geometry: {
//     //             type: "Point",
//     //             coordinates: start
//     //           }
//     //         }
//     //       ]
//     //     }
//     //   },
//     //   paint: {
//     //     "circle-radius": 10,
//     //     "circle-color": "#3887be"
//     //   }
//     // });
//   }

//   render() {
//     const { container, classNameStyle } = this.props;
//     return (
//       <div id={container} className={classNameStyle}>
//         <div className="buttonMapTrackMe">
//           <Button
//             label="Me encontre"
//             primary={false}
//             onClickFunction={this.handleFlyToAPosition}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// const { string, number } = PropTypes;

// Map.propTypes = {
//   container: string.isRequired,
//   style: string.isRequired,
//   classNameStyle: string.isRequired,
//   zoom: number.isRequired,
//   accessToken: string.isRequired
// };

// export default Map;

// // import React, { Component } from 'react'
// // import { ScatterplotLayer } from '@deck.gl/layers'
// // import {MapboxLayer} from '@deck.gl/mapbox';
// // import mapboxgl from 'mapbox-gl'

// // mapboxgl.accessToken = ''

// // // Initialize mapbox map
// // const map = new mapboxgl.Map({
// //   container: 'map',
// //   style: 'mapbox://styles/mapbox/streets-v9',
// //   center: [-74.50, 40],
// //   zoom: 9
// // });

// // // Create a mapbox-compatible deck.gl layer
// // const myDeckLayer = new MapboxLayer({
// //   id: 'my-scatterplot',
// //   type: ScatterplotLayer,
// //   data: [
// //     {position: [-74.5, 40], size: 10000}
// //   ],
// //   getPosition: d => d.position,
// //   getRadius: d => d.size,
// //   getColor: [255, 0, 0]
// // });

// // // Insert the layer before mapbox labels
// // map.on('load', () => {
// //   map.addLayer(myDeckLayer, 'waterway-label');
// // });
