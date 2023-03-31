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
      <div>
        <p className="text-3xl text-left ml-9 mt-20 leading-relaxed" style={{ marginLeft: '1rem' }}>
          인증서
        </p>
      </div>
      <div>
        <p className="text-3xl text-left ml-9 leading-relaxed" style={{ marginLeft: '1rem' }}>
          리스트
        </p>
        <br />
      </div>
        <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        >
        {certList.map((cert) => (
          <SwiperSlide >
            <p className="text-3xl text-left leading-relaxed">
              {Object.keys(cert)} - {Object.values(cert)}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      </div>
      <Navbar className="fixed" />
    </div>
  );
}

export default Main;
