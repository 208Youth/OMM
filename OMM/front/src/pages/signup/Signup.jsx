import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import MoreInfo from './MoreInfo';
import MoreInfo2 from './MoreInfo2';
import MoreInfo3 from './MoreInfo3';
import MoreInfo4 from './MoreInfo4';
import MoreInfo5 from './MoreInfo5';
import SignupComplete from './SignupComplete';
import FaceRecog from './FaceRecog';

function Signup() {
  const [step, setStep] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const jwt = searchParams.get('jwt');
  localStorage.setItem('accesstoken', jwt);

  useEffect(() => {
    if (step === 1) {
      console.log('얼굴ㅇ니증 끝났자나');
      const cookies = document.cookie.split(';');
      const hasLoaded = cookies.find((cookie) =>
        cookie.trim().startsWith('isLoaded='),
      );
      if (hasLoaded) {
        setIsLoaded(true);
      } else {
        document.cookie = 'isLoaded=true;max-age=31536000';
        console.log('쿠키넣음', document.cookie);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
  }, [step]);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem] mx-auto">
      {step === 1 && <MoreInfo setStep={setStep} />}
      {step === 2 && <MoreInfo2 setStep={setStep} />}
      {step === 3 && <MoreInfo3 setStep={setStep} />}
      {step === 4 && <MoreInfo4 setStep={setStep} />}
      {step === 5 && <MoreInfo5 setStep={setStep} />}
      {step === 6 && <SignupComplete />}
    </div>
  );
}

export default Signup;
