/*eslint-disable*/
import { Link } from 'react-router-dom';
import React from 'react';

function Navbar() {
  const withdraw = function() {
    if (confirm("탈퇴하면 인증된 정보가 모두 사라집니다. 탈퇴하시겠습니까?")) {
      window.localStorage.clear();
    }else{
      return
    }
  }
  return (
    <nav className="flex justify-evenly bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 bottom-0 left-0 border-t border-gray-200 dark:border-gray-600">
      <Link to="/main">
        <div className="mt-2 grid justify-items-center">
          <svg
            className="w-6 text-[#4654a3]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <p className="text-[#4654a3]">Home</p>
        </div>
      </Link>
      <div className="ml-2">
        <Link to="/Cert">
          <button
            type="button"
            className="text-white bg-[#4654a3] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </button>
        </Link>
      </div>
      <div onClick={withdraw} className="mt-2 grid justify-items-center">
        <svg
          className="w-6 text-[#4654a3]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <p className="text-[#4654a3]">Resign</p>
      </div>
    </nav>
  );
}

export default Navbar;
