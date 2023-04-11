import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import http from '../../api/http';
import CloseBtn from '../../assets/CloseBtn.svg';
import estateYes from '../../assets/estate_yes.svg';
import estateNo from '../../assets/estate_no.svg';
import jobYes from '../../assets/job_yes.svg';
import jobNo from '../../assets/job_no.svg';
import incomeYes from '../../assets/income_yes.svg';
import incomeNo from '../../assets/income_no.svg';
import healthYes from '../../assets/health_yes.svg';
import healthNo from '../../assets/health_no.svg';
import universityYes from '../../assets/university_yes.svg';
import universityNo from '../../assets/university_no.svg';
import certificateYes from '../../assets/certificate_yes.svg';
import certificateNo from '../../assets/certificate_no.svg';
import Pslider from '../../components/Pslider';
import './Pslider.css';

// props를 통해 userid를 받고 claose 버튼을 눌러서 해당 userid의
// 아니면 메인 페이지에 해당 컴포넌트를 아예 합쳐버릴까
function OtherProfile() {
  // const token = localStorage.getItem('accesstoken');
  // const memberId = 2;
  const token = localStorage.getItem('accesstoken');

  const { id } = useParams();
  console.log(id);

  const memberId = parseInt(id);

  console.log('상대방 아이디요', memberId);
  console.log(typeof memberId);

  const [newCertinfo, setCert] = useState([]);
  const [interest, setInterest] = useState([]);
  const [basicInfomation, setInfo] = useState([]);
  // new_certinfo인지 certinfo인지 axios주고받으면서 확인

  async function Freshinfo() {
    console.log('멤버아이디', memberId);
    await http({
      method: 'get',
      url: `/member/${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('상대방정보인뎁쇼', res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(memberId);
      });
  }

  async function FreshCert() {
    await http({
      method: 'get',
      url: `/member/${memberId}/certificate`,
      headers: {
        Authorization: `Bearer ${token}`,
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

  // const FreshCert = () => {
  //   http.get(`member/${memberId}/cert`, { headers: { Authorization: `Bearer ${token}` } })
  //     .then((response) => setCert(response.data))
  //     .catch((error) => console.error(error));
  // };
  const FreshInterest = async () => {
    await http({
      method: 'get',
      url: `/member/${memberId}/interest-list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('관심사멉니까', res.data);
        setInterest(res.data.interestList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    Freshinfo();
    FreshCert();
    FreshInterest();
  }, []);

  useEffect(() => {
    AOS.init();
  });

  let drinkingStyleText;
  if (basicInfomation.drinking_style === 'NOT') {
    drinkingStyleText = '논 알코올';
  } else if (basicInfomation.drinking_style === 'SOMETIMES') {
    drinkingStyleText = '가끔';
  } else if (basicInfomation.drinking_style === 'OFTEN') {
    drinkingStyleText = '자주';
  } else if (basicInfomation.drinking_style === 'EVERYDAY') {
    drinkingStyleText = '술고래';
  } else if (basicInfomation.drinking_style === 'ONLY_FRIENDS') {
    drinkingStyleText = '친구들이랑';
  } else if (basicInfomation.drinking_style === 'STOPPING') {
    drinkingStyleText = '금주령';
  }

  let smokingStyleText;
  if (basicInfomation.smoking_style === 'NOT') {
    smokingStyleText = '비흡연자';
  } else if (basicInfomation.smoking_style === 'SOMETIMES') {
    smokingStyleText = '가끔';
  } else if (basicInfomation.smoking_style === 'OFTEN') {
    smokingStyleText = '자주';
  } else if (basicInfomation.smoking_style === 'STOPPING') {
    smokingStyleText = '금연중';
  }

  let contactStyleText;
  if (basicInfomation.contact_style === 'PREFER_MSG') {
    contactStyleText = '카톡러';
  } else if (basicInfomation.contact_style === 'PREFER_CALL') {
    contactStyleText = '전화선호';
  } else if (basicInfomation.contact_style === 'PREFER_FACECALL') {
    contactStyleText = '영상통화선호';
  } else if (basicInfomation.contact_style === 'NOT_MSG') {
    contactStyleText = '카톡 안보는 편';
  } else if (basicInfomation.contact_style === 'PREFER_OFFLINE') {
    contactStyleText = '직접 만나는거 선호';
  }

  let petText;
  if (basicInfomation.pet === 'NOT') {
    petText = '안키움';
  } else if (basicInfomation.pet === 'DOG') {
    petText = '강아지';
  } else if (basicInfomation.pet === 'CAT') {
    petText = '고양이';
  } else if (basicInfomation.pet === 'HAMSTER') {
    petText = '햄스터';
  } else if (basicInfomation.pet === 'LIZARD') {
    petText = '도마뱀';
  } else if (basicInfomation.pet === 'ETC') {
    petText = '기타';
  }

  let militaryText;
  if (basicInfomation.military === 'NONE') {
    militaryText = '해당없음';
  } else if (basicInfomation.military === 'EXEMPT') {
    militaryText = '면제';
  } else if (basicInfomation.military === 'COMPLETE') {
    militaryText = '군필';
  } else if (basicInfomation.military === 'YET') {
    militaryText = '미필';
  }

  return (
    <div>
      <div>
        <div
          id="otherslider"
          className="top-0 left-0 w-full sticky transition-all"
        >
          <Pslider profileImg={basicInfomation.profileimgs} />
        </div>
        <div
          id="otherinfos"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          className="mx-auto z-7 sticky transition-all sm:w-[37rem] w-[22.5rem] rounded-3xl bg-white text-left z-10 shadow-lg border-t"
        >
          <div className="infodetail">
            <div className="text-right">
              <img
                src={CloseBtn}
                alt="closbtn"
                className="w-8 h-8 inline-block object-right hover:cursor-pointer"
                onClick={() => {
                  goBack();
                }}
                aria-hidden
              />
            </div>
            <div className="mb-8">
              <span className="text-4xl m-3 font-light mb-8 text-[#364C63]">
                {basicInfomation.nickname}
              </span>
              <span className="text-[#364C63] text-2xl">
                {' '}
                {basicInfomation.age}
              </span>
            </div>
            {/* <div className="text-slate-500 text-sm ml-2">
              <span className="inline-block">
                <img src={location} alt="" width={10} />
              </span>
              <span className="mb-1" />
            </div> */}
            <div>
              <hr />
              <div className="my-1" data-aos="fade-up">
                <div className="text-2xl m-3 font-light mb-8 text-[#364C63]">
                  자기소개
                </div>
                {basicInfomation.pr && (
                  <div className="text-slate-600 text-sm font-sans m-3">
                    {basicInfomation.pr}
                  </div>
                )}
                {!basicInfomation.pr && (
                  <div className="text-slate-600 text-sm font-sans m-3">
                    당신에게 OMM...
                  </div>
                )}
                <hr className="thickhr" />
              </div>
              <div className="font-light" data-aos="fade-up">
                <div className="text-2xl m-3 font-light mb-8 text-[#364C63]">
                  내 정보
                </div>
                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      키
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer font-sans font-semibold text-black ">
                        {basicInfomation.height}
                        {' '}
                        cm
                      </span>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      음주 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer font-sans font-semibold text-black">
                        {drinkingStyleText}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      연락 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer font-sans font-semibold text-black">
                        {contactStyleText}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      흡연 스타일
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer font-sans font-semibold text-black">
                        {smokingStyleText}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      MBTI
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer font-sans font-semibold text-black">
                        {basicInfomation.MBTI}
                      </span>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      반려동물
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-sans font-semibold text-black">
                        {petText}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span className="font-sans font-semibold text-black">
                      병역여부
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-sans font-semibold text-black">
                        {militaryText}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
                <div data-aos="fade-up">
                  <div className="flex-col m-3">
                    <div className="text-2xl my-3 font-light mb-8 text-[#364C63]">
                      관심사
                    </div>
                    {interest
                      && interest.map((item) => (
                        <button
                          key={item.interest_list_id}
                          className="bg-white border border-[#364C63] text-[#364C63] rounded-2xl text-sm px-4 mr-2 h-10 font-sans font-semibold"
                        >
                          {item.name}
                        </button>
                      ))}
                    {interest.length === 0 && (
                      <div className="text-slate-600 text-sm font-sans my-3">
                        아직 등록된 관심사가 없습니다.
                      </div>
                    )}
                    <div />
                    <hr className="thickhr" />
                  </div>
                  <div className="text-2xl m-3 font-light mb-8 text-[#364C63]">
                    인증정보
                  </div>

                  <div className="mb-16">
                    <div className="my-5 ml-10 flex flex-wrap">
                      <div className="inline-block">
                        <Tooltip id="my-tooltip" />
                        <img
                          src={
                          newCertinfo.health !== false ? healthYes : healthNo
                        }
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.health
                              ? newCertinfo.health_info
                              : '정보 없음'
                          }`}
                        />
                      </div>
                      <div className="inline-block">
                        <img
                          src={
                          newCertinfo.university !== false
                            ? universityYes
                            : universityNo
                        }
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.university
                              ? newCertinfo.university_name
                              : '정보 없음'
                          }`}
                        />
                      </div>
                      <div className="inline-block">
                        <img
                          src={newCertinfo.job !== false ? jobYes : jobNo}
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.job ? newCertinfo.job_name : '정보 없음'
                          }`}
                        />
                      </div>
                      <div className="inline-block">
                        <img
                          src={
                          newCertinfo.certificate !== false
                            ? certificateYes
                            : certificateNo
                        }
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.certificate
                              ? newCertinfo.certificate_names
                              : '정보 없음'
                          }`}
                        />
                      </div>
                      <div className="inline-block">
                        <img
                          src={
                          newCertinfo.estate !== false ? estateYes : estateNo
                        }
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.estate
                              ? newCertinfo.estate_amount
                              : '정보 없음'
                          }`}
                        />
                      </div>
                      <div className="inline-block">
                        <img
                          src={
                          newCertinfo.income !== false ? incomeYes : incomeNo
                        }
                          alt="#"
                          className="badges transition duration-500 hover:scale-110 bg-red-100 rounded-full"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${
                            newCertinfo.income
                              ? newCertinfo.income_amount
                              : '정보 없음'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
