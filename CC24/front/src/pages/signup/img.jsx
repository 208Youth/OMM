import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '../../../../../../../vite.svg';

function Signup() {
  const [count, setCount] = useState(0);

  return (

    <div>
      <h1>
        본인
      </h1>
      <h1>
        확인
      </h1>
      <div>
        <label htmlFor="img">사진 올려라</label>
        <input type="file" id="img" name="img" accept="image/png, image/jpeg" />
      </div>

    </div>
  );
}

export default Signup;
