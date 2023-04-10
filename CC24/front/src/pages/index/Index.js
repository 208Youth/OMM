import './Index.css';
import { Link } from 'react-router-dom';
import React from 'react';
import CC24Logo from '../../assets/cc24trans.svg';

function Index() {
  return (
    <div className="flex-col w-80 mx-auto">
      <div className="logo-box">
        <img src={CC24Logo} className="" alt="CC24 logo" />
      </div>
      <div className="flex-col ml-10">
        <Link to="/signup">
          <button className="btn">회원가입</button>
        </Link>
      </div>
      {/* <div>
        <Link to="/login">
          <button className="btn">로그인</button>
        </Link>
      </div> */}
    </div>
  );
}

export default Index;
