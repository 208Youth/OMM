import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import http from '../../api/http';
import TestImg from '../../components/assets/images/img_1.jpg';
import Navbar from '../../components/nav-bar';

function LikeList() {
  const [likes, setLikes] = useState();

  const navigate = useNavigate();

  async function getLikes() {
    await http({
      method: 'get',
      url: '/liskes',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
    // await axios({
    //   method: 'get',
    //   url: '/api/member/liked',
    //   // headers: {
    //   //   Authorization: token,
    //   // },
    // })
      .then((res) => {
        console.log(res.liked_list);
        setLikes(res.liked_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const gotoProfile = (id) => {
    navigate(`/OtherProfile/${id}`, { state: { id: `${id}` } });
  };

  useEffect(() => {
    getLikes();
  });

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">OMM List</span>
      </div>
      <div className="mx-6 grid grid-cols-2 gap-y-4">
        {likes
          && likes.map((person) => (
            <div
              className="relative"
              onClick={() => {
                gotoProfile(person.member_id);
              }}
              aria-hidden
            >
              <img
                src={person.image_main}
                alt=""
                className="w-36 h-56 rounded-2xl"
              />
              <div className="text-white font-sans">
                <span className="absolute bottom-4 left-4">
                  {person.nickname}
                  {person.age}
                </span>
              </div>
            </div>
          ))}
        <div className="relative">
          <img src={TestImg} alt="" className="w-36 h-56 rounded-2xl" />
          <div>
            <span className="absolute bottom-4 left-4 text-white font-sans font-semibold">
              정우성 47
            </span>
          </div>
        </div>
        <img src={TestImg} alt="" className="w-36 h-56 rounded-2xl" />
        <img src={TestImg} alt="" className="w-36 h-56 rounded-2xl" />
        <img src={TestImg} alt="" className="w-36 h-56 rounded-2xl" />
      </div>
      <Navbar likesNav />
    </div>
  );
}

export default LikeList;
