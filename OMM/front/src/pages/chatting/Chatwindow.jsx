import React from 'react';

function ChatWindow() {
  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <h1>Chating Room</h1>
      <div className="w-[312px] h-[4.7rem] flex bg-white bg-opacity-10 text-xs rounded-lg mb-1">
        화면
        <div id="chatdetail">
          <div>
            {/* 만약 보낸사람이 내가 아니라면 */}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
