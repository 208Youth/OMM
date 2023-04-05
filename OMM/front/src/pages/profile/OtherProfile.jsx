import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useParams } from 'react-router-dom';
import http from '../../api/http';
import CloseBtn from '../../assets/CloseBtn.svg';
import estate_yes from '../../assets/estate_yes.svg';
import estate_no from '../../assets/estate_no.svg';
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
import './Pslider.css';

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

// props를 통해 userid를 받고 claose 버튼을 눌러서 해당 userid의
// 아니면 메인 페이지에 해당 컴포넌트를 아예 합쳐버릴까
function OtherProfile() {
  // const token = localStorage.getItem('accesstoken');
  // const memberId = 2;
  const token = localStorage.getItem('accesstoken');

  const { id } = useParams();
  console.log(id);

  const memberId = parseInt(id);

  console.log(memberId);
  console.log(typeof memberId);

  const [new_certinfo, setCert] = useState([]);
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
        console.log(res);
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
      url: `/member/${memberId}/cert`,
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
  const FreshInterest = () => {
    http.get(`/member/${memberId}/interest-list`)
      .then((response) => setInterest(response.data.interestList))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Freshinfo();
    FreshCert();
    FreshInterest();
  }, []);

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
        </div>
        <div className="profileinfo">
          <div className="infodetail">

            <div className="text-right">
              <img src={CloseBtn} alt="closbtn" className="w-8 h-8 inline-block object-right" />
            </div>

            <span className="text-3xl ml-2">
              {basicInfomation.nickname}
            </span>
            <span>
              {' '}
              {basicInfomation.age}
            </span>
            <div
              className="text-slate-500 text-sm ml-2"
            >
              <span className="inline-block">
                <img src={location} alt="" width={10} />
              </span>
              <span className="mb-1" />

            </div>
            <div>

              <hr />
              <div className="my-1">
                <div className="text-2xl m-3">자기소개</div>
                <div
                  className="text-slate-600 text-sm"
                >
                  {basicInfomation.pr}
                </div>
              </div>
              <hr className="thickhr" />
              <div className="font-light">
                <div className="text-2xl m-3 font-light">내 정보</div>
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>키</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer">
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
                    <span>음주 스타일</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {/* <span className="hover:cursor-pointer">{basicInfomation.drinking_style}</span> */}
                      <span className="hover:cursor-pointer">{drinkingStyleText}</span>

                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>고등학교</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{basicInfomation.highschool}</span>

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
                      <span className="hover:cursor-pointer">{contactStyleText}</span>

                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>흡연 스타일</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="hover:cursor-pointer">{smokingStyleText}</span>

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
                      <span className="hover:cursor-pointer">{basicInfomation.MBTI}</span>

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
                      <span className="">{petText}</span>

                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <span>병역여부</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{militaryText}</span>

                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between m-3">
                  <div className="">
                    <div>관심사</div>
                    <div>
                      <InterestList interest={interest} />

                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="">{militaryText}</span>

                    </div>
                  </div>
                </div>
              </div>
              <hr className="thickhr" />

              <hr />
              <div className="text-xl m-3">
                인증정보
              </div>

              <div>
                <div className="my-5 ml-5">
                  <div className="inline-block">
                    <Tooltip id="my-tooltip" />
                    <img
                      src={new_certinfo.health === true ? health_yes : health_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`건강데이터넣을것임 ${new_certinfo.health}`}
                    />
                  </div>
                  <div className="inline-block">
                    <img
                      src={new_certinfo.university === true ? university_yes : university_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`${new_certinfo.university}`}
                    />
                  </div>
                  <div className="inline-block">
                    <img
                      src={new_certinfo.job === true ? job_yes : job_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`${new_certinfo.job}`}
                    />
                  </div>
                  <div className="inline-block">
                    <img
                      src={new_certinfo.certificate === true ? certificate_yes : certificate_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={` ${new_certinfo.certificate}`}
                    />
                  </div>
                  <div className="inline-block">
                    <img
                      src={new_certinfo.estate === true ? estate_yes : estate_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={` ${new_certinfo.estate}`}
                    />
                  </div>
                  <div className="inline-block">
                    <img
                      src={new_certinfo.income === true ? income_yes : income_no}
                      alt="#"
                      className="badges"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={` ${new_certinfo.income}`}
                    />
                  </div>
                </div>
              </div>
              <hr />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OtherProfile;
