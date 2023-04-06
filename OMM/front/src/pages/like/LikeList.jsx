import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../api/http';
import Navbar from '../../components/nav-bar';

function LikeList() {
  const [likes, setLikes] = useState();

  const navigate = useNavigate();
  function handleGoBack() {
    navigate('/main');
  }
  const token = localStorage.getItem('accesstoken');

  async function getLikes() {
    await http({
      method: 'get',
      url: '/member/liked',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('좋아요 목록 가져오기', res.data.liked_list);
        setLikes(res.data.liked_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const gotoProfile = (id) => {
    navigate(`/otherprofile/${id}`, { state: { id: `${id}` } });
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div
        onClick={handleGoBack}
        className="hover:cursor-pointer text-2xl mx-6 py-8"
        aria-hidden
      >
        <span>
          &lt;

        </span>
        <span className="ml-3 font-sans font-bold">OMM List</span>
      </div>
      <div className="mx-6 flex flex-wrap justify-between">
        {likes
          && likes.map((person) => (
            <div
              className="relative mb-6"
              onClick={() => {
                gotoProfile(person.member_id);
              }}
              aria-hidden
              data-aos="zoom-in"
              data-aos-offse="120"
            >
              <img
                src={`data:image/png;base64,${person.image_main}`}
                alt=""
                className="w-36 h-56 rounded-2xl object-cover"
              />
              <div className="text-white font-sans">
                <span className="absolute bottom-4 left-4">
                  {person.nickname}
                  {' '}
                  {person.age}
                </span>
              </div>
            </div>
          ))}
        {!likes && (
          <div className="h-[22.5rem] flex justify-center" data-aos="zoom-in">
            <div className="text-center text-md my-auto">
              아직 좋아요한 사람이 없네요.
            </div>
          </div>
        )}
      </div>
      <Navbar likesNav />
    </div>
  );
}

export default LikeList;
