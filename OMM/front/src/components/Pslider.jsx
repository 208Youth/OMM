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
  const [imgs, setImages] = useState([]);
  // let imgs = [];
  useEffect(() => {
    if (location.pathname.includes('main') && !mainImg) {
      console.log(mainImg);
      setImages(mainImg);
    } else if (location.pathname.includes('profile') && profileImg) {
      setImages(profileImg);
    } else {
      setImages([slide_image_1]);
    }
    console.log('이미지 와야댐', imgs);
  }, []);

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
        {imgs &&
          imgs.map((img) => (
            <div>
              <SwiperSlide className='static flex content-center'>
                <img src={img} alt="이미지" />
                {location.pathname.includes('main') && 
                  <div className='flex absolute bottom-[10%] left-[5%] w-[50%] h-[10%] mx-auto'>
                    <div className="flex px-6 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 my-auto rounded-full my-auto">
                      <span className="text-xl h-12 mt-2 mx-auto text-white">{name}</span>
                    </div>
                    <div className="flex w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full my-auto ml-2">
                      <span className="text-xl mx-auto my-auto text-white">{age}</span>
                    </div>
                  </div>}
              </SwiperSlide>
              ;
            </div>
          ))}
        {/* {imgs && (
          <SwiperSlide>
            <img src="/public/defaultimage.png" alt="slide_image" />
          </SwiperSlide>
        )} */}
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
