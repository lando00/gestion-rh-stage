import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/style.css';
import App from './App';
import Login from './Components/Login/Login';
import { CustomeContextProvider } from './Components/Context/CustomeContext.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import Mission from './Components/Mission/Mission'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from './Components/Toast/CustomToast';

import Teste from './Components/Autorisation/Teste';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomeContextProvider>
      <CustomToast />
        <Routes>
          <Route path='/*' element={ <App /> } />
          <Route path="/" element={<Login />} />
        </Routes>
      </CustomeContextProvider>
    </BrowserRouter>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Teste />} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
