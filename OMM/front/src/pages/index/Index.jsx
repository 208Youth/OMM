import React from 'react';
import './Index.css';
// import { Link } from 'react-router-dom';
import http from '../../api/http';

function Index() {
  async function signup() {
    const type = 'SIGNUP';
    await http
      .get(`sign/${type}`)
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.href = `http://localhost:3000/login?type=${type}`;
  }

  async function login() {
    const type = 'SIGNIN';
    await http
      .get(`sign/${type}`)
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
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
          <img
            className="self-center"
            src="../../../public/ommlogo.png"
            alt=""
          />
        </div>
      </div>
      <div className="buttons">
        <div className="grid justify-items-center">
          <h1 className="text-white text-3xl">맞소사.</h1>
          <h1 className="text-white text-3xl mt-2 mb-20">Oh My Match</h1>
          <button type="button" onClick={signup} className="btn-white">
            회원가입
          </button>
          <button type="button" onClick={login} className="btn-transparent">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
