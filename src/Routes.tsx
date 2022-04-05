import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RepoOne from 'views/pages/RepoOne';
import RepoTwo from 'views/pages/RepoTwo';
import NotFound from 'views/errorPage/NotFound';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/repos1" element={<RepoOne />} />
      <Route path="/repos2" element={<RepoTwo />} />
      <Route path="/" element={<Navigate replace to="/repos1" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
