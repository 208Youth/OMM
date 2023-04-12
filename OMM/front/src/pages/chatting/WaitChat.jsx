import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function WaitChat() {
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();
  const senderId = useSelector((state) => state.chat.memberId);

  let stompClient;
  const decoded = jwt_decode(token);

  const websocket = () => {
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    stompClient = Stomp.over(ws);

    stompClient.connect(
      headers,
      (frame) => {
        stompClient.subscribe(`/sub/chat/room/${decoded.sub}`, (message) => {
          const recv = JSON.parse(message.body);
          navigate(`/chatwindow/${recv.id}`);
        });
      },
      (error) => {
      },
    );
  };

  const createChatting = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    stompClient.connect(headers, (frame) => {
      stompClient.send(
        '/pub/chat/room',
        headers,
        JSON.stringify({ senderId }),
        navigate('/chattings'),
        window.location.reload(),
      );
    });
  };

  useEffect(() => {
    websocket();
    createChatting();
  }, []);

  return (
    <div>
      <div className="text-3xl text-center mt-48">채팅방을 생성중입니다.</div>
    </div>
  );
}

export default WaitChat;
