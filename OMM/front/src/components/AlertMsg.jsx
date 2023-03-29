import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router';
import Img from '../assets/testprofile.png';
import './AlertMsg.css';

function AlertMsg() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [successmessage, setMessage] = useState();

  const navigate = useNavigate();

  const successMatch = () => {
    setIsOpen(true);
    setMessage('매칭 성공!');
    setTimeout(() => {
      setIsOpen(false);
      setMessage('');
      navigate('/faceRecog/chat', {
        state: { page: 'chat' },
      });
    }, 2000);
  };
  return (
    <div className="w-[312px] h-[4.7rem] flex p-3 bg-white bg-opacity-60 text-xs rounded-lg mb-1">
      <div className="w-10 h-10 self-center rounded-full">
        <img src={Img} alt="사진" />
      </div>
      <div className="self-center w-40 ml-3">보영 님이 당신에게 옴</div>
      <div className="w-8 h-8 self-center mr-3 mt-1">
        <img src="/reverseheart.png" alt="" />
      </div>
      <div className="w-8 h-8 self-center mt-2">
        <img
          src="/likeheart.png"
          alt=""
          aria-hidden
          onClick={() => {
            successMatch();
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
