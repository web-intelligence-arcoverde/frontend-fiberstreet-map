import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import App from "./src/pages/App";
import "./config/ReactotronConfig";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";

console.tron.log(process.env.NODE_ENV);
const RJRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<RJRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
