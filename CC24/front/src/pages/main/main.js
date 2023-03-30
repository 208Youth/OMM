/* eslint-disable */
import './Main.css';
import React from 'react';
import Navbar from '../../components/Navbar';

function Main() {
  localStorage.setItem('array', [1])
  const test = localStorage.getItem('array')
  console.log(test);
  const tests = () => {
    test.push(1)
  }
  return (
    <div className="flex px-10" onClick={tests}>
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">Main</p>
      </div>
      <Navbar className="fixed" />
    </div>
  );
}

export default Main;
