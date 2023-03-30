/* eslint-disable */
import './Main.css';
import React from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

function Main() {
  const certList = useSelector((state) => state.user.cert);
  console.log(certList);
  return (
    <div className="flex px-10">
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">Main</p>
        <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        >
        {certList.map((cert) => (
          <SwiperSlide >
            <div className="flex items-center pl-3">
            <input
              id="vue-checkbox"
              type="checkbox"
              value= {Object.keys(cert)}
              onClick={(e) => {check(e.target.value)}}
            />
            <label
              htmlFor="vue-checkbox"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {Object.keys(cert)} - {Object.values(cert)}
            </label>
          </div>
          </SwiperSlide>
        ))}
      </Swiper>

      </div>
      <Navbar className="fixed" />
    </div>
  );
}

export default Main;
