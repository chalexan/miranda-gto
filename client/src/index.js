import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import DeviceTable from './components/deviceTable';
import DeviceCard from './components/deviceCard';
import LayoutPage from './components/layoutPage';
import 'antd/dist/antd.css';
import SignInPage from './components/signinPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={sessionStorage.getItem("isLogin") ? <LayoutPage page="devicetable" /> : <LayoutPage page="login" />} />
      <Route path="/partner" element={sessionStorage.getItem("isLogin") ? <LayoutPage page="partner" /> : <LayoutPage page="login" />} />
      <Route path="/partner/:id" element={<LayoutPage page="partnercard" />} />
      <Route path="/device/table" element={sessionStorage.getItem("isLogin") ? <LayoutPage page="devicetable" /> : <LayoutPage page="login" />} />
      <Route path="/history" element={sessionStorage.getItem("isLogin") ? <LayoutPage page="history" /> : <LayoutPage page="login" />} /> :
      <Route path="/login" element={<LayoutPage page="login" />} />
    </Routes>
  </BrowserRouter>
);
