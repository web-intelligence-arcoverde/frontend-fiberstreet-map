import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './config/ReactotronConfig';
import { Provider } from 'react-redux';

import store from './redux/store';

const RJRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RJRedux />, document.getElementById('root'));
