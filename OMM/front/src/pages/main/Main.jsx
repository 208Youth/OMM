import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../../components/nav-bar';
import Pslider from '../../components/Pslider';
import './Main.css';
import { useSelector } from 'react-redux';

function Main() {
  // const [userlist, setUserList] = useState();
  const [img, setImage] = useState();

  // const firstperson = useSelector((state) => state.리듀서이름.상태이름[0]);

  // useEffect(async () => {
  //   // 추천알고리즘 으로 나온 상대방 id 리스트 axios 요청
  //   await axios({
  //     method: 'get',
  //     url: '/api/recommend',
  //     // headers: {
  //     //   Authorization: token,
  //     // },
  //   })
  //     .then((res) => {
  //       console.log(res.userList);
  //       setUserList(userlist);
  //       // persist-redux 로 유저리스트 저장코드 작성필요
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(async () => {
  //   await axios({
  //     method: 'get',
  //     url: `/api/recommend/member/${firstperson}`,
  //     headers: {
  //       Authorization: token,
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //     setImage(res.imageList);
  //   });
  // }, [firstperson]);

  return (
    <div className="flex flex-col">
      <div className="z-20 w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full shadow-md justify-center mx-auto mt-10">
        <img
          className="w-10 h-10 mx-auto mt-3 flex"
          src="/reverseheart.png"
          alt=""
        />
      </div>
      <div className="mt-20">
        <Pslider imgs={img} />
      </div>
      {/* <Navbar mainNav={firstperson} /> */}
      <Navbar mainNav />
    </div>
  );
}

export default Main;
