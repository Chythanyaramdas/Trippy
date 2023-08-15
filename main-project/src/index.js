import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {store} from './redux/store'
import { BrowserRouter as Routes } from 'react-router-dom';
import StaffContext from './helper/context/StaffContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>

<Provider store={store}>
  <StaffContext>
  <Routes>
  <App />
  </Routes>
  </StaffContext>
    </Provider>
  // </React.StrictMode>
);


