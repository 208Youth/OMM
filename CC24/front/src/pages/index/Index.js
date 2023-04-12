import './Index.css';
import { Link } from 'react-router-dom';
import React from 'react';
import CC24Logo from '../../assets/cc24trans.svg';

function Index() {
  return (
    <div className="flex-col w-80 mx-auto">
      <div className="flex-col w-80 mx-auto mt-20 mb-10">
        <img src={CC24Logo} className="" alt="CC24 logo" />
      </div>
      <div className="flex-col mx-auto text-center">
        <Link to="/signup">
          <button className="btn">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
