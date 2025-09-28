import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import { store, persistor } from './store/index.js';
import 'antd/dist/reset.css'; // Import Ant Design styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate delays rendering until the Redux store is rehydrated from local storage */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);