import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '@/components/ChatRoom.jsx';
import Navbar from '@/components/nav-bar.jsx';
import http from '@/api/http.js';

function ChatList() {
  const [chats, setChats] = useState([]);
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  async function getChatList() {
    await http({
      method: 'get',
      url: '/chat/room',
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('받은데이터', res.data.list);
        setChats(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const gotoChatwindow = (id) => {
    navigate(`/Chatwindow/${id}`);
    console.log('가자');
  };

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    console.log('바꼇니', chats);
  }, [chats]);

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span onClick={handleGoBack} className="hover:cursor-pointer ">
          <span>&lt;</span>
          <span className="ml-3 font-sans font-bold">Chattings</span>
        </span>

      </div>
      <div className="mx-6">
        {chats
          && chats.map((chat) => (
            <ChatRoom
              chat={chat}
              moveTo={(res) => {
                if (res) {
                  gotoChatwindow(chat.id);
                }
              }}
            />
          ))}
        {!chats && (
          <div className="h-[22.5rem] flex justify-center">
            <div className="my-auto">아직 매칭이 되지 않았어요ㅠ.ㅠ</div>
          </div>
        )}
      </div>
      <Navbar chatlistNav />
    </div>
  );
}

export default ChatList;
