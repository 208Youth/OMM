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
        Authorization: import.meta.env.VITE_TOKEN,
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
                <div className="text-xl m-3">
                  자기소개
                </div>
                <div
                  className="text-slate-600 text-sm"
                >
                  {basicInfomation.pr}
                </div>
              </div>
              <hr />
              <div className="text-xl m-3">
                인증정보
              </div>
              <div className="text-xl">
                Oh my my
              </div>
              <div>

                <InterestList interest={interest} />
                <hr />
                <div />

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
