import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chatInfo } from '../store/chatSlice';
import ommheart from '../assets/ommheart.png';

function AlertMsg({ msg, deletemsg }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [successmessage, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteMatch = (msginfo) => {
    deletemsg(msginfo);
    // alertmsg.current.style.display = 'none';
  };

  const successMatch = (msginfo) => {
    setIsOpen(true);
    setMessage('매칭 성공!');
    setTimeout(() => {
      setIsOpen(false);
      setMessage('');
      dispatch(chatInfo(msginfo.senderId));
      // navigate('/faceRecog/chat', {
      //   state: { page: 'chat' },
      // });
      navigate('/facerecog/chat');
    }, 2000);
  };
  return (
    <div className="w-[312px] h-[4.7rem] flex p-3 bg-white bg-opacity-60 text-xs rounded-lg mb-1">
      <div className="w-10 h-10 self-center rounded-full object-cover">
        {msg.sender.imageContent ? (
          <img
            src={`data:image/png;base64,${msg.sender.imageContent.imageContent}`}
            alt="사진"
          />
        ) : (
          <img src={ommheart} alt="사진" />
        )}
      </div>
      <div className="self-center w-40 ml-3 font-sans">
        <span className="font-sans font-bold inline-block whitespace-nowrap overflow-hidden text-ellipsis">
          {msg.sender.nickname}
        </span>
        님이 당신에게 옴
      </div>
      <div className="w-8 h-8 self-center mr-3 mt-1">
        <img
          src="/reverseheart.png"
          alt=""
          aria-hidden
          onClick={() => {
            const dmsg = {
              id: msg.id,
              senderId: msg.sender.memberId,
              createdTime: msg.createdTime,
            };
            deleteMatch(dmsg);
          }}
        />
      </div>
      <div className="w-8 h-8 self-center mt-2">
        <img
          src="/likeheart.png"
          alt=""
          aria-hidden
          onClick={() => {
            const dmsg = {
              id: msg.id,
              senderId: msg.sender.memberId,
              createdTime: msg.createdTime,
            };
            successMatch(dmsg);
            deleteMatch(dmsg);
          }}
        />
      </div>
      {successmessage && (
        <Modal
          isOpen={modalIsOpen}
          className="matchSuccessModal"
          overlayClassName="matchSuccessOverlay"
          ariaHideApp={false}
        >
          <div className="h-full flex justify-center text-xl text-center">
            <div className="self-center">
              <div>{successmessage}</div>
              <div className="font-sans text-sm mt-2">
                채팅방을 생성중입니다
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AlertMsg;
