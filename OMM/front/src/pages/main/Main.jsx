import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/http';
import Navbar from '../../components/nav-bar';
import Pslider from '../../components/Pslider';
import './Main.css';
import { lists } from '../../store/recSlice';

function Main() {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.rec.list);
  const firstperson = useSelector((state) => state.rec.list)[0];
  const [userlist, setUserList] = useState();
  const [img, setImage] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    // 추천알고리즘 으로 나온 상대방 id 리스트 axios 요청
    axios({
      method: 'get',
      url: '/recommend',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data.userList);
        setUserList(res.data.userList);
        console.log(userlist);
        dispatch(lists(res.data.userList));
        console.log(firstperson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/recommend/member/${firstperson}`,
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    }).then((res) => {
      console.log(res);
      setImage(res.data.imageList);
      setName(res.data.nickname);
    });
  }, [firstperson]);

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
        {name}
      </div>
      {/* <Navbar mainNav={firstperson} /> */}
      <Navbar mainNav />
    </div>
  );
}

export default Main;
