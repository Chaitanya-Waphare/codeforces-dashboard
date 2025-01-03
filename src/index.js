import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@shopify/polaris/build/esm/styles.css'; // Include Polaris styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
