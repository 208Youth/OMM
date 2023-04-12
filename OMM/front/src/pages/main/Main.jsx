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

  const firstPerson = async () => {
    await http({
      method: 'get',
      url: `/recommend/member/${firstperson}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setImage(res.data.imageList);
      setName(res.data.nickname);
      setAge(res.data.age);
      setId(res.data.memberId);
    });
  };
  const getRecommend = async () => {
    if (localStorage.getItem('accesstoken') === null) {
      navigate('/');
    }
    await http({
      method: 'get',
      url: '/recommend',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserList(res.data.userList);
        dispatch(lists(res.data.userList));
        firstPerson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    firstPerson();
  }, [firstperson]);

  useEffect(() => {
    getRecommend();
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
      .then(() => {
        dispatch(dis(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toOther = () => {
    navigate(`/otherprofile/${id}`);
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
      <Navbar mainNav id={id} />
    </div>
  );
}

export default Main;
