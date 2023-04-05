import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Pslider.css';
import { useLocation } from 'react-router-dom';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import slide_image_1 from '../../public/defaultimage.png';

function Pslider({ mainImg, profileImg, name, age }) {
  const location = useLocation();
  console.log(profileImg);
  console.log(mainImg);
  // console.log(imgs);
  // // let imgs = [];
  // useEffect(() => {
  //   if (location.pathname.includes('main') && mainImg) {
  //     setImages(mainImg);
  //   }
  //   console.log(mainImg);
  // }, []);

  console.log('이름', name);
  console.log(age);
  console.log(mainImg);

  return (
    <div className="pcontainer">
      {/* <h1 className="heading">1222</h1> */}
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        freeMode
        // loop
        slidesPerView="auto"
        // spaceBetween={-1500} // 슬라이드 요소간 간격을 20px로 설정
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {/* 이미지 리스트 들어오는 코드 작성한 후에 아래 주석풀어주세요 */}
        {location.pathname.includes('main') && (
          <SwiperSlide className="static flex content-center">
            <img src={slide_image_1} alt="slide_image" />
            <div className="flex absolute bottom-[10%] left-[5%] w-[50%] h-[10%] mx-auto">
              <div className="flex px-6 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto">
                <span className="text-xl h-12 mt-2 mx-auto text-white">
                  {name}
                </span>
              </div>
              <div className="flex w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto ml-2">
                <span className="text-xl mx-auto my-auto text-white">
                  {age}
                </span>
              </div>
            </div>
          </SwiperSlide>
        )}
        {mainImg &&
          mainImg.map((img, index) => (
            <div key={index}>
              <p>이미지</p>
              <SwiperSlide className="static flex content-center">
                <img src={`data:image/png;base64,${img}`} alt={img} />
                {location.pathname.includes('main') && (
                  <div className="flex absolute bottom-[10%] left-[5%] w-[50%] h-[10%] mx-auto">
                    <div className="flex px-6 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto">
                      <span className="text-xl h-12 mt-2 mx-auto text-white">
                        {name}
                      </span>
                    </div>
                    <div className="flex w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto ml-2">
                      <span className="text-xl mx-auto my-auto text-white">
                        {age}
                      </span>
                    </div>
                  </div>
                )}
              </SwiperSlide>
              ;
            </div>
          ))}
        {profileImg &&
          profileImg.map((img, index) => (
            <div key={index}>
              <SwiperSlide className="static flex content-center">
                {location.pathname.includes('rofile') && (
                  <img src={`data:image/png;base64,${img}`} alt="이미지" />
                )}
              </SwiperSlide>
              ;
            </div>
          ))}
        {!profileImg && location.pathname.includes('rofile') && (
          <SwiperSlide>
            <img src={slide_image_1} alt="slide_image" />
          </SwiperSlide>
        )}
        {/* <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline" />
          </div>
          <div className="swiper-pagination" />
        </div> */}
      </Swiper>
    </div>
  );
}

export default Pslider;
