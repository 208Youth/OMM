import React, { useState, useEffect } from 'react';
import './Pslider.css';
// import './Profile.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Modal from 'react-modal';
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
import MyinfoSetModal from './MyinfoSetModal';
import MyinfoSetModal3 from './MyinfoSetModal3';
import MyinfoSetModal2 from './MyinfoSetModal2';
import http from '@/api/http';
// props를 통해 userid를 받고 claose 버튼을 눌러서 해당 userid의
// 아니면 메인 페이지에 해당 컴포넌트를 아예 합쳐버릴까
function MyProfile({ profileNav }) {
  profileNav = true;
  const certinfo = {
    university: null,
    job: true,
    certificate: '잘했어요일기장',
    health: null,
    estate: null,
    income: null,
  };
  // const interest = [
  //   {
  //     interest_list_id: 1,
  //     name: '관심사 이름1',
  //   },
  //   {
  //     interest_list_id: 2,
  //     name: '관심사 이름2',
  //   },
  //   {
  //     interest_list_id: 3,
  //     name: '관심사 이름3',
  //   },
  // ];
  // const basicInfomation = [{
  //   nickname: '12',
  //   age: 20,
  //   pr: 1,
  //   height: 180,
  //   drinking_stlye: 1,
  //   highschool: 1,
  //   contact_stlye: 1,
  //   military: 1,
  //   mbti: 1,
  //   interest: null,
  //   pet: null,
  // },
  // ];
  // const filterInfomation = [{
  //   age_min: 1,
  //   age_max: 100,
  //   range_min: 1,
  //   range_max: 100,
  //   height_min: 1,
  //   height_max: 100,
  // }];

  const [MymodalIsOpen, setMyIsOpen] = useState(false);
  const [MymodalIsOpen2, setMyIsOpen2] = useState(false);
  const [MymodalIsOpen3, setMyIsOpen3] = useState(false);
  // const memberId = localStorage.getItem('member_id');
  const memberId = 1;
  const token = localStorage.getItem('accesstoken');
  const openMyModal = () => {
    setMyIsOpen(true);
  };
  const closeMyModal = () => {
    setMyIsOpen(false);
  };
  const openMyModal2 = () => {
    setMyIsOpen2(true);
  };
  const closeMyModal2 = () => {
    setMyIsOpen2(false);
  };
  const openMyModal3 = () => {
    setMyIsOpen3(true);
  };
  const closeMyModal3 = () => {
    setMyIsOpen3(false);
  };
  const [new_certinfo, setCert] = useState(certinfo);
  const [interest, setInterest] = useState([]);
  const [basicInfomation, setInfo] = useState([]);
  const [filterInfomation, setFilter] = useState([]);

  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };
  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
  // new_certinfo인지 certinfo인지 axios주고받으면서 확인
  // const GetuserInfo = () => {
  //   http
  //   .get(`/api/member/${memberId}`)
  // }
  async function Freshinfo() {
    await http({
      method: 'get',
      url: '/member',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        console.log(res);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log('왜자꾸안되');
        console.log(import.meta.env.VITE_TOKEN);
      });
  }

  async function FreshCert() {
    await http({
      method: 'get',
      url: `/member/${memberId}/cert`,
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        console.log(res);
        setCert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function FreshFilter() {
    await http({
      method: 'get',
      url: '/member/filtering',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        console.log(res);
        setFilter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const FreshInterest = () => {
    http
      .get('/member/interest')
      .then((response) => setInterest(response.data.interestList))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    FreshCert();
    FreshInterest();
    FreshFilter();
    Freshinfo();
  }, []);

  async function toCert() {
    await http
      .get('/sign/certificate', {
        headers: {
          // Authorization: import.meta.env.VITE_TOKEN,
          Authorization: `Bearer ${token}`, // TODO: 임시 토큰 부여
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="scroll-smooth">
      <div className="text-center">
        <Modal
          className="MyinfoModal"
          isOpen={MymodalIsOpen}
          onRequestClose={closeMyModal}
        >
          <MyinfoSetModal setModal={closeMyModal} basicInfomation={basicInfomation} />
        </Modal>
      </div>
      <div className="text-center">
        <Modal
          className="MyinfoModal"
          isOpen={MymodalIsOpen2}
          onRequestClose={closeMyModal2}
        >
          <MyinfoSetModal2 setModal={closeMyModal2} />
        </Modal>
      </div>
      <div className="text-center">
        <Modal
          className="MyinfoModal3"
          isOpen={MymodalIsOpen3}
          onRequestClose={closeMyModal3}
        >
          <MyinfoSetModal3 setModal={closeMyModal3} />
        </Modal>
      </div>
      <div>
        <div className="absolute top-20 left-0 w-full z-5">
          <Pslider />
          <div>
            <div
            // className={isHovered ? 'imagesetting:hover' : 'imagesetting'}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
              className="imagesetting"
            >
              <img src={imagesetting} alt="$" />
            </div>
          </div>

          <div className="profileinfo">
            <div className="infodetail">
              <div className="text-right">
                <img
                  src={CloseBtn}
                  alt="closbtn"
                  className="w-8 h-8 inline-block object-right"
                />
              </div>

              <span className="text-3xl ml-2">{basicInfomation.nickname}</span>
              <span>
                {' '}
                {basicInfomation.age}
              </span>
              <div className="text-slate-500 text-sm ml-2">
                <span className="inline-block">
                  <img src={location} alt="" width={10} />
                </span>
                <div className="flex justify-between">
                  <span className="mb-1">{basicInfomation.lat}</span>
                  <span className="flex justify-end">위치수정</span>
                </div>
              </div>
              <div>
                <hr className="thickhr" />
                <div className="my-1">
                  <div className="text-2xl m-3">자기소개</div>
                  {/* 아이콘을 누르면 input이 가능하게 바꾸기 */}
                  <div className="text-slate-600 text-sm">{basicInfomation.pr}</div>
                  <span className="flex justify-end">
                    <img src={pencil} alt="" />
                  </span>
                </div>
                <hr className="thickhr" />
                
                  </div>
                  <hr />
                  <div className="flex justify-between m-3">
                    <div className="">
                      <span>흡연 스타일</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="">{basicInfomation.smoking_stlye}</span>
                        <div
                          onClick={() => {
                            openMyModal();
                          }}
                        >
                          <img src={userarrow} alt="" className="w-3 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between m-3">
                    <div className="">
                      <span>MBTI</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="">{basicInfomation.mbti}</span>
                        <div
                          onClick={() => {
                            openMyModal();
                          }}
                        >
                          <img src={userarrow} alt="" className="w-3 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between m-3">
                    <div className="">
                      <span>관심사</span>
                    </div>
                    <div
                      onClick={() => {
                        openMyModal3();
                      }}
                    >
                      <div className="flex items-center">
                        <span className="">{}</span>
                        <div>
                          <img src={userarrow} alt="" className="w-3 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between m-3">
                    <div className="">
                      <span>반려동물</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="">{}</span>
                        <div
                          onClick={() => {
                            openMyModal();
                          }}
                        >
                          <img src={userarrow} alt="" className="w-3 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <hr className="thickhr" />

                <div className="text-2xl m-3 ">선호하는 상대정보</div>
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>나이범위</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">
                        {' '}
                        {filterInfomation.age_min}
                        {' '}
                        -
                        {' '}
                        {filterInfomation.age_max}
                        {' '}
                        살
                      </span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>키범위</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">
                        {filterInfomation.height_min}
                        {' '}
                        -
                        {' '}
                        {filterInfomation.max}
                        cm
                      </span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>거리 반경</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">
                        {' '}
                        {filterInfomation.range_min}
                        {' '}
                        -
                        {' '}
                        {filterInfomation.range_max}
                        {' '}
                        km
                      </span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>연락 스타일</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{filterInfomation.contact_stlye}</span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>음주 스타일</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{filterInfomation.drinking_stlye}</span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="" />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>흡연여부</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{filterInfomation.smoking_stlye}</span>
                      <div>
                        <img src={userarrow} alt="" className="w-3 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="" />
                <div className="flex justify-between">
                  <span className="text-xl m-3 ">인증정보</span>
                  <div onClick={toCert} className="flex items-center m-2">
                    <span className="">설정하기</span>
                    <div>
                      <img src={userarrow} alt="" className="w-3 ml-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="my-5 ml-5">
                    <div className="inline-block">
                      <Tooltip id="my-tooltip" />
                      <img
                        src={new_certinfo.health !== null ? health_yes : health_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${new_certinfo.health}`}
                      />
                    </div>
                    <div className="inline-block">
                      <img
                        src={new_certinfo.university !== null ? university_yes : university_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${new_certinfo.university}`}
                      />
                    </div>
                    <div className="inline-block">
                      <img
                        src={new_certinfo.job !== null ? job_yes : job_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${new_certinfo.job}`}
                      />
                    </div>
                    <div className="inline-block">
                      <img
                        src={new_certinfo.certificate !== null ? certificate_yes : certificate_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={` ${new_certinfo.certificate}`}
                      />
                    </div>
                    <div className="inline-block">
                      <img
                        src={new_certinfo.estate !== null ? estate_yes : estate_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={` ${new_certinfo.estate}`}
                      />
                    </div>
                    <div className="inline-block">
                      <img
                        src={new_certinfo.income !== null ? income_yes : income_no}
                        alt="#"
                        className="badges"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={` ${new_certinfo.income}`}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="text-xl">Oh my my</div>
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
    </div>
  );
}

function InterestList({ interest }) {
  return (
    <div>
      <div>
        <div />
      </div>

      {interest.map((item) => (
        <button
          key={item.interest_list_id}
          className="bg-white border border-black rounded-full text-sm px-4"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default MyProfile;
