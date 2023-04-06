import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import CloseBtn from '../../assets/CloseBtn.svg';

const { kakao } = window;

function Kakaomap({ setModal, location }) {
  const [state, setState] = useState({
    center: {
      lat: 35.205739,
      lng: 126.8115825,
    },
    errMsg: null,
    isLoading: true,
  });
  const [newposition, setPosition] = useState();
  const [addr, setAddr] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        console.log(newSearch);
        setState((prev) => ({
          ...prev,
          center: { lat: newSearch.y, lng: newSearch.x },
        }));
        setPosition({
          lat: newSearch.y,
          lng: newSearch.x,
        });
      }
    };
    geocoder.addressSearch(addr, callback);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: '현위치를 알고 싶다면 위치를 허용해주세요.',
        isLoading: false,
      }));
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
      <div className="font-medium text-[#364C63] mb-3">내 위치 설정</div>
      <input
        type="text"
        id="location"
        onChange={(e) => {
          setAddr(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            SearchMap();
          }
        }}
        className="mb-3 font-sans text-[#364C63] tracking-wide bg-white border-2 border-[#364c6375] focus:border-[#364C63] placeholder-[#364C63] placeholder-opacity-75 text-sm rounded-3xl block w-full p-2.5 drop-shadow-md"
        placeholder="시/구/동 및 주소를 입력해주세요"
      />
      <div className="ring-2 ring-[#364C63] rounded-2xl">
        <Map // 지도를 표시할 Container
          center={state.center}
          style={{
            // 지도의 크기
            width: '100%',
            height: '250px',
            borderRadius: '16px',
          }}
          level={3}
          onClick={(_t, mouseEvent) => {
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            });
            setState((prev) => ({
              ...prev,
              center: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
              isLoading: false,
            }));
          }}
        >
          {newposition && (
            <MapMarker
              position={newposition}
              clickable
              onClick={() => setIsOpen(true)}
            >
              <div style={{ minWidth: '150px' }}>
                <div style={{ padding: '5px', color: '#000' }}>
                  여기로 설정
                  <br />{' '}
                  <a
                    href={`https://map.kakao.com/link/map/여기로 설정,${newposition.lat},${newposition.lng}`}
                    style={{ color: 'blue' }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    크게보기
                  </a>{' '}
                </div>
              </div>
            </MapMarker>
          )}
          {!newposition && (
            <MapMarker // 마커를 생성합니다
              position={state.center}
              clickable
              onClick={() => setIsOpen(true)}
            >
              {isOpen && (
                <div style={{ minWidth: '150px' }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                      cursor: 'pointer',
                    }}
                    aria-hidden
                    onClick={() => setIsOpen(false)}
                  />
                  {state.errMsg && (
                    <div style={{ padding: '5px', color: '#000' }}>
                      SSAFY 광주
                      <br />{' '}
                      <a
                        href="https://map.kakao.com/link/map/SSAFY 광주 캠퍼스,35.205739,126.8115825"
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        크게보기
                      </a>{' '}
                    </div>
                  )}
                  {!state.errMsg && (
                    <div style={{ padding: '5px', color: '#000' }}>
                      현위치 <br />{' '}
                      <a
                        href={`https://map.kakao.com/link/map/,${state.center.lat},${state.center.lng}`}
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        크게보기
                      </a>{' '}
                    </div>
                  )}
                </div>
              )}
            </MapMarker>
          )}
        </Map>
      </div>
      <button
        type="button"
        onClick={() => {
          location(state.center);
          setModal(false);
        }}
        className="bg-[#364C63] text-white hover:bg-white hover:text-[#364C63] hover:border-[#364C63] hover:border-2 w-full mt-5 h-10 rounded-3xl drop-shadow-md font-sans font-semibold"
      >
        완료
      </button>
    </div>
  );
}

export default Kakaomap;
