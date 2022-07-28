import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@/design/index.css';
import '@/design/App.css';

import App from './App';

import { Toaster } from 'react-hot-toast';
// import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Spin } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Toaster />
    <HashRouter>
      <Suspense fallback={<Spin className="spin-loading-class" tip="Loading..." />}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
