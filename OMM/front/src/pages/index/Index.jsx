import React from 'react';
import './Index.css';
// import { Link } from 'react-router-dom';
import http from '../../api/http';
import logo from '../../assets/ommlogo.png';

function Index() {
  async function sign(type) {
    await http
      .get(`sign/${type}`)
      .then(({ data }) => {
        console.log(data);
        window.location.href = data;
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.href = `http://localhost:3000/login?type=${type}`;
  }

  return (
    <div className="background">
      <div className="logo">
        <div className="flex">
          <img className="self-center" src={logo} alt="" />
        </div>
      </div>
      <div className="buttons mx-auto">
        <div className="grid justify-items-center">
          <h1 className="text-white text-3xl">맞소사.</h1>
          <h1 className="text-white text-3xl mt-2 mb-20">Oh My Match</h1>
          <button
            type="button"
            onClick={() => {
              sign('SIGNUP');
            }}
            className="btn-white"
          >
            회원가입
          </button>
          <button
            type="button"
            onClick={() => {
              sign('SIGNIN');
            }}
            className="btn-transparent"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
