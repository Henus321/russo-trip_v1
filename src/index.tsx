import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user';
import { CompanyProvider } from './contexts/company';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CompanyProvider>
          <App />
        </CompanyProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
