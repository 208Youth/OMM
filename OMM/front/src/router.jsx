import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FaceRecog from './pages/signup/FaceRecog'
import Index from './pages/index/Index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/FaceRecog',
    element: <FaceRecog />,
  },
]);

export default router;
