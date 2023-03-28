import React from 'react';

function SignupComplete() {
  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem] flex">
      <div className="my-auto mx-auto">
        <img
          src="./ommheart.png"
          alt=""
          className="mx-auto pb-6 w-[10rem]"
        />
        <div className="text-center text-3xl text-[#364C63] mb-3">
          회원 가입 완료!
        </div>
        <p className="text-center text-xs text-gray-400 font-sans mb-20">
          누가 당신을 기다리고 있을까요?
        </p>
      </div>
    </div>
  );
}

export default SignupComplete;