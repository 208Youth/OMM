import React from 'react';
import './Index.css';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className="background">
      <div className="logo">
        <div className="flex">
          <img className="self-center" src="../../../public/ommlogo.png" alt="" />
        </div>
      </div>
      <div className="buttons">
        <div className="grid justify-items-center">
          <h1 className="text-white text-3xl">맞소사.</h1>
          <h1 className="text-white text-3xl mt-2 mb-20">Oh My Match</h1>
          <Link to="/signup">
            <button className="btn-transparent">회원가입</button>
          </Link>
          <Link to="/login">
            <button className="btn-white">로그인</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
