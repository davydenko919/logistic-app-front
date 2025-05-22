import './index.css';
import App from './components/App/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}>
        <PersistGate persistor={persistor}> */}
          <App />
        {/* </PersistGate>
      </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);