import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from 'views/pages/HomePage';
import NotFound from 'views/errorPage/NotFound';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}