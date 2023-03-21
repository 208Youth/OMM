import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/signup/Signup_modal_test';
import test from './pages/signup/test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/Signup/test',
    element: <Signup />,
  },
]);

export default router;
