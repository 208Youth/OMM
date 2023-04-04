import React from 'react';

function Login() {
  const test = () => {
    window.location.replace('http://localhost:3000/login');
  };
  return (
    <div>
      로그인 페이지
      <hr />
      <button className="menu" onClick={test}>
        CC24로 가기
      </button>
    </div>
  );
}

export default Login;
