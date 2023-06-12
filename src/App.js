// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeniorListPage from './pages/SeniorListPage';
import SeniorDetailsPage from './pages/SeniorDetailsPage';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/senior" element={<SeniorListPage />} />
        <Route path="/senior/:id" element={<SeniorDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
