import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import FaceRecog from './pages/signup/FaceRecog'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/FaceRecog',
    element: <FaceRecog />,
  },
  //   {
  //     path: "/login",
  //     element: <App />,
  // },
]);

export default router;
