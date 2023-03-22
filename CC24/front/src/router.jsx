import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Signup from './pages/signup/Signup.jsx';
import IdenModal from './pages/signup/IdenModal.jsx';
import Index from './pages/index/Index';
import Login from './pages/login/login';
import FaceRecogModal from './pages/signup/FaceRecogModal';
import Cert from './pages/cert/Cert';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/FaceRecogModal',
    element: <FaceRecogModal />,
  },
  {
    path: '/Cert',
    element: <Cert />,
  },
  {
    path: '/IdenModal',
    element: <IdenModal />,
  },
]);

export default router;
