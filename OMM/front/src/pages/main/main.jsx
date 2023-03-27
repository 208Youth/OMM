import React from 'react';
import Navbar from '../../components/nav-bar';
import Pslider from '../../components/Pslider';
import './Main.css'

function Main() {
  return (
    <div className='flex flex-col'>
      <div className='w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full shadow-md justify-center mx-auto mt-10'>
        <img className="w-10 h-10 mx-auto mt-3 flex" src="/reverseheart.png" alt="" />
      </div>
      <div className="mt-20">
        <Pslider />
      </div>
      <Navbar />
    </div>
  )
}

export default Main;
