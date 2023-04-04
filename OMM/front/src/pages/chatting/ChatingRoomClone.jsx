/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import chat from '../../api/chat';

function ChatingRoomClone() {
  const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId'));
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender'));
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ws = new SockJS('http://localhost:5000/api/chat');
  const stompClient = Stomp.over(ws);

  useEffect(() => {
    findRoom();
    chat.get(`/rooms/${roomId}` + '/messages')

    // axios.get(`http://localhost:5000/api/chat/room/${roomId}` + '/messages')
      .then(({ data }) => {
        console.log('아래는 유스이펙트시 실행되는 코드');
        console.log(data);
        setMessages([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
    connect();
  }, []);

  const findRoom = () => {
    // axios.get(`http://localhost:5000/api/chat/room/${roomId}`).then((response) => {
    chat.get(`/room/${roomId}`).then((response) => {
      setRoom(response.data);
      console.log('아래는 파인드 룸의 리스폰스 데이터');
      console.log(response.data);
    });
  };

  const sendMessage = () => {
    stompClient.connect({}, () => {
      stompClient.send('/api/pub/chat/message', {}, JSON.stringify({ roomId, senderId: sender, content: message }));
      setMessage('');
      stompClient.disconnect();
    });
  };

  const recvMessage = (recv) => {
    console.log('받음?');
    console.log(recv);
    setMessages(() => [
      ...messages,
      recv,
    ]);
  };

  const connect = () => {
    console.log('connect실행');
    console.log(messages.length);
    stompClient.connect({}, () => {
      console.log('stompClient connect');
      stompClient.subscribe('/sub/chat/entrance', (readDto) => {
        // axios.get(`http://localhost:5000/api/chat/room/${roomId}` + '/messages')
        chat.get(`/room/${roomId}` + '/messages')
          .then(({ data }) => {
            console.log('아래는 유스이펙트시 실행되는 코드');
            console.log(data);
            setMessages([...data]);
          })
          .catch((error) => {
            console.log(error);
          });
        connect();
        console.log('stompClient subscribe');
        console.log(readDto);
        console.log('위는 readDto');
        // if (readDto.headers['message-type'] ==='message') {
        //   recvMessage(JSON.parse(readDto.body));
        // }
        const readIndex = JSON.parse(readDto.body);
        console.log('readIndex');
        console.log(readIndex);
        recvReadDto(readIndex);
      });

      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        recvMessage(recv);
      });
    });
  };

  const recvReadDto = (readIndex) => {
    const { lastReadIndex } = readIndex;
    console.log(messages);
    console.log(`메세지길이.${messages.length}`);

    const copies = [...messages];

    for (let i = lastReadIndex; i < copies.length; i++) {
      copies[i].isRead = true;
    }

    setMessages(copies);
  };

  return (
    <div id="Chat">
      <div>{room.id}</div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <span>
              {msg.senderId}
              가 보냄:
              {' '}
            </span>
            <span>{msg.content}</span>
            <h3>{msg.isRead ? '읽음' : '안읽음'}</h3>
          </li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatingRoomClone;
