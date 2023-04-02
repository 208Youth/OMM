import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FaceRecog from './pages/signup/FaceRecog';
import Index from './pages/index/Index';
import Signup from './pages/signup/Signup';
import MoreInfo from './pages/signup/MoreInfo';
import MoreInfo2 from './pages/signup/MoreInfo2';
import MoreInfo3 from './pages/signup/MoreInfo3';
import MoreInfo4 from './pages/signup/MoreInfo4';
import SignupComplete from './pages/signup/SignupComplete';
// import Login from './pages/login/Login';
import MyinfoSetModal from './pages/profile/MyinfoSetModal';
import OtherProfile from './pages/profile/OtherProfile';
import MyProfile from './pages/profile/MyProfile';
import Alert from './pages/alert/Alert';
import ChatList from './pages/alert/ChatList';
import Admin from './pages/admin/Admin';
import Detail from './pages/admin/Detail';
import Main from './pages/main/Main';
import Chatwindow from './pages/chatting/Chatwindow';
// import ChatingRoomClone from './pages/chatting/ChatingRoomClone';
import ChatingRobbyClone from './pages/chatting/ChatingRobbyClone';
import ImageUploader from './pages/profile/ImageUploader';
import Login from './pages/login/login';
import LikeList from './pages/like/LikeList';
import WaitChat from './pages/chatting/WaitChat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/faceRecog/:page',
    element: <FaceRecog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/OtherProfile',
    element: <OtherProfile />,
  },
  {
    path: '/MyinfoSetModal',
    element: <MyinfoSetModal />,
  },
  {
    path: '/moreinfo',
    element: <MoreInfo />,
  },
  {
    path: '/moreinfo/2',
    element: <MoreInfo2 />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/moreinfo/3',
    element: <MoreInfo3 />,
  },
  {
    path: '/MyProfile',
    element: <MyProfile />,
  },
  {
    path: '/moreinfo/4',
    element: <MoreInfo4 />,
  },
  {
    path: '/signupcomplete',
    element: <SignupComplete />,
  },
  {
    path: '/notification',
    element: <Alert />,
  },
  {
    path: '/chattings',
    element: <ChatList />,
  },
  {
    path: '/Chatwindow/:id',
    element: <Chatwindow />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/detail/:id',
    element: <Detail />,
  },
  {
    path: '/ImageUploader',
    element: <ImageUploader />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/likes',
    element: <LikeList />,
  },
  {
    path: '/ImageUploader',
    element: <ImageUploader />,
  },
  {
    path: '/ChatingRobbyClone',
    element: <ChatingRobbyClone />,
  },
  // {
  //   path: '/ChatingRoomClone',
  //   element: <ChatingRoomClone />,
  // },
  {
    path: '/loading',
    element: <WaitChat />,
  },
]);

export default router;
