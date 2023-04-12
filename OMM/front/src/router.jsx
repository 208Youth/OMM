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
import MyinfoSetModal from './pages/profile/MyinfoSetModal';
import OtherProfile from './pages/profile/OtherProfile';
import MyProfile from './pages/profile/MyProfile';
import Alert from './pages/alert/Alert';
import ChatList from './pages/alert/ChatList';
import Admin from './pages/admin/Admin';
import Detail from './pages/admin/Detail';
import AdminLogin from './pages/admin/AdminLogin';
import Main from './pages/main/Main';
import Chatwindow from './pages/chatting/Chatwindow';
import ImageUploader from './pages/profile/ImageUploader';
import LikeList from './pages/like/LikeList';
import WaitChat from './pages/chatting/WaitChat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/facerecog/:page',
    element: <FaceRecog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/otherprofile/:id',
    element: <OtherProfile />,
  },
  {
    path: '/myinfosetModal',
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
    path: '/myprofile',
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
    path: '/chatwindow/:id',
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
    path: '/imageUploader',
    element: <ImageUploader />,
  },
  {
    path: '/likes',
    element: <LikeList />,
  },
  {
    path: '/loading',
    element: <WaitChat />,
  },
  {
    path: '/adminlogin',
    element: <AdminLogin />,
  },
]);

export default router;
