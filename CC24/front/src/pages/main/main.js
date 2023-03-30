/* eslint-disable */
import './Main.css';
import React from 'react';
import Navbar from '../../components/Navbar';

function Main() {
  return (
    <div className="flex px-10">
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">Main</p>
      </div>
      <Navbar className="fixed" />
    </div>
  );
}

export default Main;
