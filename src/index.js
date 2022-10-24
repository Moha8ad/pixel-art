import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store.js';

import App from './app/App';

import './index.css';

// PersistGate is used to persist the data passed into redux, e.g. page reload

ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
 );