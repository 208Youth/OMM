/* eslint-disable */
import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Main from './pages/main/Main';

function App() {
  const navigate = useNavigate();
  if (localStorage.getItem('accesstoken') === null) {
    navigate('/');
  }
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
