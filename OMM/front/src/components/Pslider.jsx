import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './Pslider.css';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import axios from 'axios';
import slide_image_1 from './assets/images/img_1.jpg';
import slide_image_2 from './assets/images/img_2.jpg';
import slide_image_3 from './assets/images/img_3.jpg';
import slide_image_4 from './assets/images/img_4.jpg';
import slide_image_5 from './assets/images/img_5.jpg';
import slide_image_6 from './assets/images/img_6.jpg';
// import slide_image_7 from './assets/images/img_7.jpg';

function Pslider({ imgs }) {
  console.log(imgs);

  return (
    <div className="pcontainer">
      {/* <h1 className="heading">1222</h1> */}
      <Swiper

        effect="coverflow"
        grabCursor
        centeredSlides
        freeMode
        loop
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
        {/* {imgs.map((img, i) => {
          <SwiperSlide key={i}>
            <img src={img} alt="이미지" />
          </SwiperSlide>;
        })} */}
        <SwiperSlide>
          <img src={slide_image_1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} alt="slide_image" />
        </SwiperSlide>

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
