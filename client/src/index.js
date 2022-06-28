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
      <Route path="/" element={<LayoutPage page="devicetable" />} />
      <Route path="/partner" element={<LayoutPage page="partner" />} />
      <Route path="/partner/:id" element={<LayoutPage page="partnercard" />} />
      <Route path="/device/table" element={<LayoutPage page="devicetable" />} />
      <Route path="/device/search" element={<LayoutPage page="devicesearch" />} />
      <Route path="/login" element={<LayoutPage page="login" />} />
    </Routes>
  </BrowserRouter>
);

