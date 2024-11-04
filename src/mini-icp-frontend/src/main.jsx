import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { InternetIdentityProvider } from "ic-use-internet-identity";
import { IdentityProvider } from './context/AppContext'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdentityProvider>
      <App />
    </IdentityProvider>
  </React.StrictMode>,
);
