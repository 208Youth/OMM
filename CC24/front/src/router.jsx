import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import FaceRecogModal from './pages/signup/FaceRecogModal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  //   {
  //     path: "/login",
  //     element: <App />,
  // },
  {
    path: '/FaceRecogModal',
    element: <FaceRecogModal />,
  },
]);

export default router;
