import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import IdenModal from './pages/signup/IdenModal';
import Index from './pages/index/Index';
import Login from './pages/login/login';
import Cert from './pages/cert/Cert';
import Main from './pages/main/Main';

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
    path: '/Cert',
    element: <Cert />,
  },
  {
    path: '/IdenModal',
    element: <IdenModal />,
  },
  {
    path: '/main',
    element: <Main />,
  },

]);

export default router;
