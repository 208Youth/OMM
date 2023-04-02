import React, { useEffect, useState } from 'react';
import ChatRoom from '../../components/ChatRoom';
import Navbar from '../../components/nav-bar';
import http from '../../api/http';

function ChatList() {
  const [chats, setChat] = useState(null);
  async function getChatList() {
    await http({
      method: 'get',
      url: '/chat/room',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data.list);
        console.log('채팅목록 불러오기 성공?');
        setChat(res.data.list);
        console.log('최종', chats);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">Chattings</span>
      </div>
      <div className="mx-6">
        {chats && chats.map((chat) => <ChatRoom chat={chat} />)}
        {Array.isArray(chats) && chats.length === 0 && (
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
