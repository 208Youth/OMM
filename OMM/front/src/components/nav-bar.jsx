import React from 'react';
import './nav-bar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
<div class="container">
  <nav class="menu">
		<Link href="#" class="menu-item">
      <i class="bi bi-search-heart transition duration-300 hover:scale-125"></i>
      <i class="bi bi-search-heart-fill scale-125"></i>
		</Link>
		<Link href="#" class="menu-item">
      <i class="bi bi-chat-heart transition duration-300 hover:scale-125"></i>
      <i class="bi bi-chat-heart-fill scale-125"></i>
		</Link>
    <div className='flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md'>
      <img className="w-10 h-10 mx-auto my-auto" src="/ommheart.png" alt="" />
    </div>
		<Link href="#" class="menu-item">
      <i class="bi bi-bell transition duration-300 hover:scale-125"></i>
      <i class="bi bi-bell-fill scale-125"></i>
		</Link>
		<Link to="/Myprofile" class="menu-item">
      <i class="bi bi-person transition duration-300 hover:scale-125"></i>
      <i class="bi bi-person-fill scale-125"></i>
		</Link>
	</nav>
</div>
  );
}

export default Navbar;
