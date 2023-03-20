import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
//   {
//     path: "/login",
//     element: <App />,
// },
]);

export default router;
