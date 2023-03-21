import './Index.css';
import CC24Logo from '../../assets/CC24.svg';
import { Link } from 'react-router-dom';

function Index() {
  return (
  <div className='wrap-box'>
    <div className="box">
      <img src={CC24Logo} className="" alt="CC24 logo" />
      <div>
        <Link to={'/signup'}><button>회원가입</button></Link>
      </div>
      <div>
        <Link to={'/login'}><button>로그인</button></Link>
      </div>
    </div>
  </div>
  );
}

export default Index;