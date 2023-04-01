import React from 'react';
import ChatRoom from '../../components/ChatRoom';
import Navbar from '../../components/nav-bar';

function ChatList() {
  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">Chattings</span>
      </div>
      <div className="mx-6">
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </div>
      <Navbar chatlistNav />
    </div>
  );
}

export default ChatList;
