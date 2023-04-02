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
          <SwiperSlide>
            <p className="text-3xl text-left leading-relaxed flex justify-start t-0">
              <span className='inline'>{cert}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check inline ml-2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"/>
                </svg>
              </span>
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
