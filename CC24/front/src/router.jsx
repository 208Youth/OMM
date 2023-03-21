import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Signup from '././pages/signup/Signup.jsx';
import Index from '././pages/index/Index.jsx';
import Login from './pages/login/Login.jsx';
import FaceRecogModal from './pages/signup/FaceRecogModal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/FaceRecogModal',
    element: <FaceRecogModal />,
  },
]);

export default router;
