import React, { useState } from 'react';
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
  const [name, setName] = useState(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [gender, setGender] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const jwt = searchParams.get('jwt');
  localStorage.setItem('accesstoken', jwt);

  const goFaceRecog = () => {
    navigate('/faceRecog/signup', {
      state: { page: 'signup' },
    });
  };

  const signup = () => {
    console.log(name);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(gender);
  };

  const years = [];
  for (let i = 1980; i < 2004; i++) {
    years.push(i);
  }
  const months = [];
  for (let i = 1; i < 13; i++) {
    months.push(i);
  }
  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      {step == 0 && <FaceRecog setStep={setStep} />}
      {step == 1 && <MoreInfo setStep={setStep} />}
      {step == 2 && <MoreInfo2 setStep={setStep} />}
      {step == 3 && <MoreInfo3 setStep={setStep} />}
      {step == 4 && <MoreInfo4 setStep={setStep} />}
      {step == 5 && <MoreInfo5 setStep={setStep} />}
      {step == 6 && <SignupComplete />}
    </div>
  );
}

export default Signup;
