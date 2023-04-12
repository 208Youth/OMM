import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import ChatRoom from '../../components/ChatRoom';
import Navbar from '../../components/nav-bar';
import http from '../../api/http';

function ChatList() {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();
  function handleGoBack() {
    navigate('/main');
  }

  async function getChatList() {
    await http({
      method: 'get',
      url: '/chat/room',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setChats(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const gotoChatwindow = (id) => {
    navigate(`/chatwindow/${id}`);
  };

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span
          onClick={handleGoBack}
          className="hover:cursor-pointer"
          aria-hidden
        >
          <span>&lt;</span>
          <span className="ml-3 font-sans font-bold">Chattings</span>
        </span>
      </div>
      <div className="mx-6">
        {chats
          && chats.map((chat) => (
            <div data-aos="fade-up">
              <ChatRoom
                chat={chat}
                moveTo={(res) => {
                  if (res) {
                    gotoChatwindow(chat.id);
                  }
                }}
              />
            </div>
          ))}
        {chats.length === 0 && (
          <div className="h-[22.5rem] flex justify-center" data-aos="zoom-in">
            <div className="flex-col my-auto text-center">
              <div className="mb-2">아직 매칭이 되지 않았어요ㅠ.ㅠ</div>
              <div>메인에서 하트를 눌러 매칭을 시작해보세요!</div>
            </div>
          </div>
        )}
      </div>
      <Navbar chatlistNav />
    </div>
  );
}

export default ChatList;
