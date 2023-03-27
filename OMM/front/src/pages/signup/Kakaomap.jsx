import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseBtn from '../../assets/CloseBtn.svg';

const { kakao } = window;

function Kakaomap({ setModal }) {
  const displayMarker = (locPosition, message, map) => {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map,
      position: map.getCenter(locPosition),
    });

    const iwContent = message; // 인포윈도우에 표시할 내용
    const iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    marker.setMap(map);
  };

  useEffect(() => {
    // 내가 짜고 있는 함수
    const container = document.getElementById('map');
    let mapOption = {
      center: new kakao.maps.LatLng(35.205739, 126.8115825), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, mapOption);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        mapOption = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;">현위치</div>';
        console.log('현재위치', locPosition);
        // getAddress(lat, lon);
        displayMarker(locPosition, message, map);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(35.205739, 126.8115825);
      const message = '현재 위치를 사용할수 없어요..';

      displayMarker(locPosition, message, map);
    }
  }, []);

  return (
    <div>
      <p className="flex justify-end">
        <img
          onClick={() => setModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <div className="font-medium text-[#364C63] mb-3">위치 확인</div>
      <input
        type="text"
        id="location"
        className="mb-3 font-sans text-[#364C63] tracking-wide bg-white border-2 border-[#364C63] focus:border-[#364C63] placeholder-[#364C63] placeholder-opacity-75 text-sm rounded-3xl block w-full p-2.5 drop-shadow-md"
        placeholder="설정된 위치"
      />
      <div className="ring-2 ring-[#364C63] rounded-2xl">
        <div id="map" className="w-full h-48 rounded-2xl" />
      </div>
      <button
        type="button"
        className="bg-[#364C63] text-white hover:bg-white hover:text-[#364C63] hover:border-[#364C63] hover:border-2 w-full mt-5 h-10 rounded-3xl drop-shadow-md font-sans font-semibold"
      >
        완료
      </button>
    </div>
  );
}

export default Kakaomap;
