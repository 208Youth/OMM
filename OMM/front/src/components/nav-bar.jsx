import React from 'react';
import './nav-bar.scss';
import { Link } from 'react-router-dom';

function Navbar({ profileNav, mainNav, notiNav }) {
  return (
    <div className="flex justify-center">
      <nav className="menu">
        <Link href="#" class="menu-item">
          <i className="bi bi-search-heart transition duration-300 hover:scale-125" />
          <i className="bi bi-search-heart-fill scale-125" />
        </Link>
        <Link href="#" class="menu-item">
          <i className="bi bi-chat-heart transition duration-300 hover:scale-125" />
          <i className="bi bi-chat-heart-fill scale-125" />
        </Link>
        {!mainNav && (
          <Link
            to="/main"
            className="flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md"
          >
            <img
              className="w-10 h-10 mx-auto my-auto"
              src="/pastelheart.png"
              alt=""
            />
          </Link>
        )}
        {mainNav && (
          <div className="flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md">
            <img
              className="w-10 h-10 mx-auto my-auto"
              src="/ommheart.png"
              alt=""
            />
          </div>
        )}
        <div className="menu-item">
          {notiNav && <i className="bi bi-bell-fill scale-125" />}
          {!notiNav && (
            <Link to="/notification" class="menu-item">
              <i className="bi bi-bell transition duration-300 hover:scale-125" />
            </Link>
          )}
        </div>
        <div className="menu-item">
          {!profileNav && (
            <Link to="/Myprofile" class="menu-item">
              <i className="bi bi-person transition duration-300 hover:scale-125" />
            </Link>
          )}
          {profileNav && <i className="bi bi-person-fill scale-125" />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
