
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store/store.js';

// Root element creation
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the Sports & eSports Tournament Platform
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Performance measurement (optional)
// You can use this to track performance of the tournament platform
// For example: reportWebVitals(console.log)
reportWebVitals();
