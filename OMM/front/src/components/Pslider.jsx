import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Pslider.css';
import { useLocation } from 'react-router-dom';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

function Pslider({ mainImg, profileImg, name, age }) {
  const location = useLocation();

  return (
    <div className="pcontainer">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        freeMode
        slidesPerView="auto"
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
        {!mainImg ||
          (mainImg?.length == 0 && location.pathname.includes('main') && (
            <SwiperSlide className="absolute flex content-center">
              <img src="/defaultimage.png" alt="slide_image" />
              <div className="flex absolute bottom-0 max-sm:bottom-[12%] left-[5%] w-fit h-[10%] mx-auto">
                <div className="flex px-6 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto">
                  <span className="text-xl w-28 h-12 mt-2 mx-auto text-white inline-block whitespace-nowrap overflow-hidden text-ellipsis">
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
          ))}
        {mainImg &&
          location.pathname.includes('main') &&
          mainImg.map((img, i) => (
            <SwiperSlide
              className="absolute flex content-center"
              key={i}
            >
              <img src={`data:image/png;base64,${img}`} alt="slide_image" />
              <div className="flex absolute bottom-0 max-sm:bottom-[12%] left-[5%] w-fit h-[10%] mx-auto">
                <div className="flex px-6 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto">
                  <span className="text-xl w-28 h-12 mt-2 mx-auto text-white inline-block whitespace-nowrap overflow-hidden text-ellipsis">
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
          ))}
        {!profileImg ||
          (profileImg?.length == 0 && location.pathname.includes('profile') && (
            <SwiperSlide className="absolute top-5 flex content-center">
              <img src="/defaultimage.png" alt="slide_image" />
              <div className="flex absolute bottom-0 left-[5%] w-fit h-[10%] mx-auto" />
            </SwiperSlide>
          ))}
        {profileImg &&
          location.pathname.includes('profile') &&
          profileImg.map((img, index) => (
            <div key={index}>
              <SwiperSlide className="absolute top-5 flex content-center">
                <img src={`data:image/png;base64,${img}`} alt="이미지" />
              </SwiperSlide>
              ;
            </div>
          ))}
      </Swiper>
    </div>
  );
}

export default Pslider;
