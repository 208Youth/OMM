import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { useNavigate } from 'react-router-dom';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import AOS from 'aos';
import Navbar from '../../components/nav-bar';
import AlertMsg from '../../components/AlertMsg';
import '../../components/AlertMsg.css';
import http from '../../api/http';

function Alert() {
  const [alertlist, setAlertList] = useState([]);
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();
  const connect = () => {
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/matching`);
    const stompClient = Stomp.over(ws);
    const decoded = jwt_decode(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    stompClient.connect(
      headers,
      (frame) => {
        stompClient.subscribe(
          `/sub/matching/noti/${decoded.sub}`,
          (message) => {
            const recv = JSON.parse(message.body);
            setAlertList((prev) => {
              const newList = [recv, ...prev];
              return newList;
            });
          },
          {},
        );
      },
      (error) => {
      },
    );
  };

  const deletemsg = (msg) => {
    setAlertList(alertlist.filter((alert) => alert.id !== msg.id));
    http({
      method: 'delete',
      url: '/matching/noti',
      data: msg,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function getAlerts() {
    await http({
      method: 'get',
      url: '/matching/noti',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.list) {
          setAlertList(res.data.list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    connect();
    getAlerts();
  }, []);

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
  }, [alertlist]);

  function handleGoBack() {
    navigate('/main');
  }
  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span
          className="hover:cursor-pointer"
          onClick={handleGoBack}
          aria-hidden
        >
          <span>&lt;</span>
          <span className="font-sans ml-3 font-bold">Notification</span>
        </span>
      </div>
      <div className="mx-6 text-lg mb-3" id="msgs">
        <div className="mt-3">
          {alertlist
            && alertlist.map((msg) => (
              <div data-aos="fade-up">
                <AlertMsg
                  msg={msg}
                  deletemsg={(res) => {
                    if (res) {
                      deletemsg(res);
                    }
                  }}
                />
              </div>
            ))}
          {alertlist.length === 0 && (
            <div className="h-[22.5rem] flex justify-center" data-aos="zoom-in">
              <div className="flex-col my-auto text-center text-md">
                <div>메인에서 아래의 하트를 눌러</div>
                <div>매칭을 보내보세요!</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar notiNav />
    </div>
  );
}

export default Alert;
