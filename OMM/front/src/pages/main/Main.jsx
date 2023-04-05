import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/nav-bar';
import Pslider from '../../components/Pslider';
import http from '../../api/http';
import './Main.css';
import { lists, dis } from '../../store/recSlice';

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const people = useSelector((state) => state.rec.list);
  const firstperson = useSelector((state) => state.rec.list)[0];
  const [userlist, setUserList] = useState();
  const [img, setImage] = useState([]);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [id, setId] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  const jwt = searchParams.get('jwt');
  if (jwt != null) {
    localStorage.setItem('accesstoken', jwt);
  }
  const token = localStorage.getItem('accesstoken');
  console.log(people);
  const firstPerson = async () => {
    await http({
      method: 'get',
      url: `/recommend/member/${firstperson}`,
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log('첫번째 사람 정보', res);
      setImage(res.data.imageList);
      setName(res.data.nickname);
      setAge(res.data.age);
      setId(res.data.memberId);
    });
  };
  useEffect(async () => {
    // 추천알고리즘 으로 나온 상대방 id 리스트 axios 요청
    console.log(localStorage.getItem('accesstoken'));
    if (localStorage.getItem('accesstoken') === null) {
      navigate('/');
    }
    console.log(token);
    await http({
      method: 'get',
      url: '/recommend',
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.userList);
        setUserList(res.data.userList);
        console.log(userlist);
        dispatch(lists(res.data.userList));
        console.log(firstperson);
        firstPerson();
      })
      .catch((err) => {
        console.log(err);
        if (err.message === 'Request failed with status code 400') {
          window.location.href = '/';
        }
      });
  }, []);
  const dislike = async () => {
    const data = {
      sender_id: id,
      favor: false,
    };
    await http({
      method: 'post',
      url: '/recommend',
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((res) => {
        console.log('시러요오오오', res);
        dispatch(dis(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toOther = () => {
    console.log('남의집');
    navigate(`/OtherProfile/${id}`);
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          dislike();
        }}
        aria-hidden
        className="z-20 w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full shadow-md justify-center mx-auto mt-5"
      >
        <img
          className="w-10 h-10 mx-auto mt-3 flex"
          src="/reverseheart.png"
          alt=""
        />
      </div>
      <div
        className=""
        onClick={() => {
          toOther();
        }}
        aria-hidden
      >
        <Pslider mainImg={img} name={name} age={age} />
      </div>
      {/* <Navbar mainNav={firstperson} /> */}
      <Navbar mainNav id={id} />
    </div>
  );
}

export default Main;
