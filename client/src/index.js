import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const token = sessionStorage.getItem('linkDashToken');

if (token) {
  axios.interceptors.request.use(
    (req) => {
      if (req.url.includes('backlink')) {
        req.headers.Authorization = token ?? '';
      }
      return req;
    },
    (err) => Promise.reject(err)
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
