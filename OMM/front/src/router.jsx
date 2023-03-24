import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FaceRecog from './pages/signup/FaceRecog'
import Index from './pages/index/Index'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/FaceRecog',
    element: <FaceRecog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
