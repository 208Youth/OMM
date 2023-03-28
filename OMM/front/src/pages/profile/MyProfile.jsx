import React, { useState, useEffect } from 'react';
import './Pslider.css';
import axios from 'axios';
import CloseBtn from '../../assets/CloseBtn.svg';
import pencil from '../../assets/pencil.svg';
import imagesetting from '../../assets/imagesetting.svg';
import estate_yes from '../../assets/estate_yes.svg';
import estate_no from '../../assets/estate_no.svg';
import car_yes from '../../assets/car_yes.svg';
import car_no from '../../assets/car_no.svg';
import job_yes from '../../assets/job_yes.svg';
import job_no from '../../assets/job_no.svg';
import income_yes from '../../assets/income_yes.svg';
import income_no from '../../assets/income_no.svg';
import health_yes from '../../assets/health_yes.svg';
import health_no from '../../assets/health_no.svg';
import university_yes from '../../assets/university_yes.svg';
import university_no from '../../assets/university_no.svg';
import certificate_yes from '../../assets/certificate_yes.svg';
import certificate_no from '../../assets/certificate_no.svg';
import location from '../../assets/location.svg';
import Pslider from '../../components/Pslider';
import Navbar from '../../components/nav-bar';
import userarrow from '../../assets/userarrow.svg';

// props를 통해 userid를 받고 claose 버튼을 눌러서 해당 userid의
// 아니면 메인 페이지에 해당 컴포넌트를 아예 합쳐버릴까
function MyProfile({ profileNav }) {
  profileNav = true;
  const certinfo = {
    university: false,
    job: true,
    certificate: false,
    health: false,
    estate: false,
    income: false,
  };
  const interest = [
    {
      interest_list_id: 1,
      name: '관심사 이름1',
    },
    {
      interest_list_id: 2,
      name: '관심사 이름2',
    },
    {
      interest_list_id: 3,
      name: '관심사 이름3',
    },
  ];

  const [new_certinfo, setCert] = useState(certinfo);
  const [new_interest, setInterest] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };
  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
  // new_certinfo인지 certinfo인지 axios주고받으면서 확인
  const FreshCert = () => {
    axios.get('https://example.com/api/data')
      .then((response) => setCert(response.data))
      .catch((error) => console.error(error));
  };
  const FreshInterest = () => {
    axios.get('')
      .then((response) => setInterest(response.data.interestList))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    FreshCert();
    FreshInterest();
  }, []);

  function InterestList({ interest }) {
    return (
      <div>
        <div>

          <div />
        </div>

        {interest.map((item) => (
          <button key={item.interest_list_id} className="bg-white border border-black rounded-full text-sm px-4">{item.name}</button>
        ))}
      </div>
    );
  }

  // useEffect(() => {
  //   axios.get('')
  //     .then((response) => setInterest(response.data.interestList))
  //     .catch((error) => console.error(error));
  // }, []);
  // useEffect의 두 번째 매개변수는 의존성 배열(dependency array)로,
  //  이 배열에 포함된 값이 변경될 때마다
  // useEffect 콜백 함수가 호출됩니다.
  // 의존성 배열이 빈 배열([])인 경우에는
  // 컴포넌트가 처음 마운트될 때만 useEffect 콜백 함수가 호출되고,
  // 그 이후에는 호출되지 않습니다.
  return (

    <div>

      <div>
        <div className="absolute top-20 left-0 w-full z-5">
          <Pslider />
          <div
            // className={isHovered ? 'imagesetting:hover' : 'imagesetting'}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            className="imagesetting"
          >
            <img src={imagesetting} alt="$" />

          </div>
        </div>

        <div className="myprofileinfo">
          <div className="infodetail">

            <div className="text-right">
              <img src={CloseBtn} alt="closbtn" className="w-8 h-8 inline-block object-right" />
            </div>

            <span className="text-3xl ml-2">
              이름
            </span>
            <span> 나이</span>
            <div
              className="text-slate-500 text-sm ml-2"
            >
              <span className="inline-block">
                <img src={location} alt="" width={10} />
              </span>
              <div className="flex justify-between">
                <span className="mb-1">주소</span>
                <span className="flex justify-end">위치수정</span>
              </div>
            </div>
            <div>

              <hr className="thickhr" />
              <div className="my-1">
                <div className="text-2xl m-3">
                  자기소개
                </div>
                {/* 아이콘을 누르면 input이 가능하게 바꾸기 */}
                <div
                  className="text-slate-600 text-sm"
                >
                  자기소개 내용
                </div>
                <span className="flex justify-end"><img src={pencil} alt="" /></span>
              </div>
              <hr className="thickhr" />
              <div className="font-light">
                <div className="text-2xl m-3 font-light">
                  내 정보
                </div>
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      키
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">180 cm</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      음주 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      고등학교
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      연락 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      흡연 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      MBTI
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      관심사
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>
                      반려동물
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{}</span>
                      <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <hr className="thickhr" />

              <div className="text-2xl m-3 ">
                선호하는 상대정보
              </div>
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    나이범위
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {' '}
                      -
                      {' '}
                      {' '}
                      살
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    키범위
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {' '}
                      -
                      {' '}
                      {' '}
                      cm
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    거리 반경
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {' '}
                      -
                      {' '}
                      {' '}
                      km
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    연락 스타일
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {}
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    음주 스타일
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {}
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr className="" />
              <div className="flex justify-between m-3">
                <div className="">
                  <span>
                    흡연여부
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="">
                      {}
                    </span>
                    <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                  </div>
                </div>
              </div>
              <hr className="" />
              <div className="flex justify-between">
                <span className="text-xl m-3 ">
                  인증정보
                </span>
                <div className="flex items-center m-2">
                  <span className="">
                    설정하기
                  </span>
                  <div><img src={userarrow} alt="" className="w-3 ml-2" /></div>
                </div>

              </div>

              <div>
                <div className="my-5 ml-5">
                  <div className="inline-block">
                    <img src={new_certinfo.health === true ? health_yes : health_no} alt="#" className="badges" />
                  </div>
                  <div className="inline-block">
                    <img src={new_certinfo.university === true ? university_yes : university_no} alt="#" className="badges" />
                  </div>
                  <div className="inline-block">
                    <img src={new_certinfo.job === true ? job_yes : job_no} alt="#" className="badges" />
                  </div>
                  <div className="inline-block">
                    <img src={new_certinfo.certificate === true ? certificate_yes : certificate_no} alt="#" className="badges" />
                  </div>
                  <div className="inline-block">
                    <img src={new_certinfo.estate === true ? estate_yes : estate_no} alt="#" className="badges" />
                  </div>
                  <div className="inline-block">
                    <img src={new_certinfo.income === true ? income_yes : income_no} alt="#" className="badges" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-xl">
                Oh my my
              </div>
              <div>

                <InterestList interest={interest} />

                <div />

              </div>
            </div>

          </div>

        </div>
        <Navbar profileNav={profileNav} />
      </div>
    </div>
  );
}

export default MyProfile;
