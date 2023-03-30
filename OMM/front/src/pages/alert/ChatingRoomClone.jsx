import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io();

function Chat() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('SEND', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (msg === '') {
      return;
    }

    socket.emit('SEND', msg);
    setMsg('');

    const newMessage = {
      content: msg,
      sender: 'me',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleMsgChange = (event) => {
    setMsg(event.target.value);
  };

  return (
    <div id="container">
      <div id="chatView">
        {messages.map((message, index) => (
          <div key={index} className={`msgLine ${message.sender}`}>
            <div className="msgBox">{message.content}</div>
          </div>
        ))}
      </div>
      <form id="chatForm" onSubmit={handleSubmit}>
        <input type="text" id="msg" value={msg} onChange={handleMsgChange} />
        <input type="submit" id="send" value="전송" />
      </form>
    </div>
  );
}

export default Chat;
