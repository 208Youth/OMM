import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
import Signup from '././pages/signup/Signup.jsx';
import Index from '././pages/index/Index.jsx';
import Login from './pages/login/Login.jsx';

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
]);

export default router;
