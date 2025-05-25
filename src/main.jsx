import './index.css';
import "modern-normalize";
import App from './components/App/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);