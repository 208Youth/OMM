import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function ChatWindow() {
  const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId'));
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender'));
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState('');
  // 임시로 메시지를 저장
  const [messages, setMessages] = useState([{ senderId: 1, content: '자나요?', isRead: true }, { senderId: 1, content: '술 마실래요', isRead: true }, { senderId: 2, content: '저 입이 없어서 술 못마셔요 ㅜㅜ', isRead: true }, { senderId: 1, content: '아 네', isRead: false }, { senderId: 1, content: '카톡 할래요?', isRead: false }, { senderId: 2, content: '저 와이파이가 안되서 카톡 못해요 ㅠㅠ', isRead: false }]);
  const ws = new SockJS('http://localhost:8080/api/chat');
  const stompClient = Stomp.over(ws);
  // 임시값으로 쁘띠재용을 받는다.
  const user2ID = '쁘띠재용';

  const findRoom = () => {
    console.log('개신기한 호이스팅');
    axios.get(`http://localhost:8080/api/chat/room/${roomId}`).then((response) => {
      setRoom(response.data);
    });
  };

  const sendMessage = () => {
    // const ws = new SockJS('http://localhost:8080/api/chat');
    // const stompClient = Stomp.over(ws);
    stompClient.connect({}, (frame) => {
      stompClient.send('/api/pub/chat/message', {}, JSON.stringify({ roomId, senderId: sender, content: message }));
      setMessage('');
      stompClient.disconnect();
    });
  };

  const connect = () => {
    const reconnect = 0;
    console.log('아래는 메시지');
    console.log(message);
    console.log(messages.length);
    stompClient.connect({}, (frame) => {
      stompClient.subscribe('/sub/chat/entrance', (readDto) => {
        const readIndex = JSON.parse(readDto.body);
        recvReadDto(readIndex);
      });

      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        recvMessage(recv);
      });
    }, (error) => {
      // if(reconnect++ < 5) {
      //   setTimeout(function() {
      //     console.log("connection reconnect");
      //     connect();
      //   },10*1000);
      // }
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

  useEffect(() => {
    findRoom();
    axios.get(`http://localhost:8080/api/chat/room/${roomId}` + '/messages')
      .then(({ data }) => {
        console.log('아래는 data 정보');
        console.log({ data });
        console.log(...data);
        console.log('위는data 정보');
        setMessages([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
    connect();
  }, []);

  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">{user2ID}</span>
      </div>
      <div className="w-[312px] h-[4.7rem] flex bg-white bg-opacity-10 text-xs rounded-lg mb-1">

        <div id="chatdetail">
          <div>
            {/* 만약 보낸사람이 내가 아니라면 */}

          </div>
          <div id="Chat">
            <div>
              {}
              <div>{room.id}</div>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index} className={`my-2 ${msg.senderId === 1 ? 'text-left' : 'text-right'}`}>
                    {msg.senderId === 1 ? (
                      <>
                        <span className="">{msg.senderId}</span>
                        <span className="text-sm mr-2">{msg.content}</span>
                        <span className="text-xs">{msg.isRead ? '읽음' : '안읽음'}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs">{msg.isRead ? '읽음' : '안읽음'}</span>
                        <span className="text-sm mr-2">{msg.content}</span>
                        <span className="">{msg.senderId}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
