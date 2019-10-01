//Reducers & Redux

import { createStore, compose, applyMiddleware } from "redux";

//Combinação dos reducers
import reducers from "./store/ducks";

//Router
import { connectRouter, routerMiddleware } from "connected-react-router";
import history from "../routes/history";

//Sagas
import sagas from "./store/sagas";
import createSagaMiddleware from "redux-saga";

const middlewares = [];
const sagaMiddlewares = createSagaMiddleware();
middlewares.push(sagaMiddlewares);
middlewares.push(routerMiddleware(history));

const composer =
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(...middlewares)
        // console.tron.createEnhancer()
      )
    : compose(applyMiddleware(...middlewares));

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || store;

const store = createStore(connectRouter(history)(reducers), composer);

sagaMiddlewares.run(sagas);

export default store;
