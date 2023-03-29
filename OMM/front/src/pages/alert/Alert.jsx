import React from 'react';
import Navbar from '../../components/nav-bar';
import AlertMsg from '../../components/AlertMsg';

function Alert() {
  return (
    <div className="text-[#364C63] w-fit mx-auto">
      <div className="text-2xl mx-6 my-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">Notification</span>
      </div>
      <div className="mx-6 text-lg mb-3">
        오늘
        <div className="mt-3">
          <AlertMsg />
          <AlertMsg />
        </div>
      </div>
      <div className="mx-6 text-lg mb-3">
        어제
        <div className="mt-3">
          <AlertMsg />
        </div>
      </div>
      <div className="mx-6 text-lg mb-3">
        이번 주
        <div className="mt-3">
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
        </div>
      </div>
      <Navbar notiNav />
    </div>
  );
}

export default Alert;
