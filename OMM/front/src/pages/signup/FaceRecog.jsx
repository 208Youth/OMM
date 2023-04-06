import React, { useState, useRef, useEffect } from 'react';
import { TinyFaceDetectorOptions } from 'face-api.js';
import * as faceapi from 'face-api.js';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import './FaceRecog.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../../api/http';
import ommheart from '../../assets/ommheart.png';

const MODEL_URL = '/models';
// 비디오 사이즈 설정
const constraints = {
  video: {
    width: 300,
    height: 300,
    facingMode: 'user',
  },
  audio: false,
};

function FaceRecog({ setStep }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [isStartDetect, setIsStartDetect] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [myinfo, setInfo] = useState(null);
  const [notice, setNotice] = useState('');
  const [recog, setRecog] = useState(false);
  const [whatpage, setPage] = useState('');
  const [isRight, setisRight] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [chatid, setChatId] = useState(null);
  const token = localStorage.getItem('accesstoken');
  const senderId = useSelector((state) => state.chat.memberId);

  let stompClient;
  const decoded = jwt_decode(token);

  const websocket = () => {
    // const ws = new SockJS('http://localhost:5000/api/chat');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    stompClient = Stomp.over(ws);

    stompClient.connect(
      headers,
      (frame) => {
        console.log('연결성공');
        stompClient.subscribe(`/sub/chat/room/${decoded.sub}`, (message) => {
          console.log(message);
          const recv = JSON.parse(message.body);
          console.log(recv);
          console.log('채팅 내용 수신', recv.id);
          navigate(`/chatwindow/${recv.id}`);
          // 리다이렉트 또는 다른 작업 수행
        });
      },
      (error) => {
        // 연결이 끊어졌을 때 재연결 시도 부분
        // 필요할 때 쓰면 될 듯.
        // if(reconnect++ < 5) {
        //   setTimeout(function() {
        //     console.log("connection reconnect");
        //     connect();
        //   },10*1000);
        // }
      },
    );
  };

  const waitForConnection = (stompClient, callback) => {
    setTimeout(() => {
      // 연결되었을 때 콜백함수 실행
      if (stompClient.ws.readyState === 1) {
        callback();
        // 연결이 안 되었으면 재호출
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1); // 밀리초 간격으로 실행
  };

  const createChatting = () => {
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`, // 매칭 수락한사람의 토큰
    };
    console.log(stompClient);
    const decoded = jwt_decode(token);
    stompClient.connect(headers, (frame) => {
      stompClient.send(
        '/pub/chat/room',
        headers,
        // 나한테 알림 보낸사람 id
        JSON.stringify({ senderId }),
        console.log('채팅방 만들라구'),
      );
    });
    console.log(stompClient);
  };

  const subconnect = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    stompClient.connect(
      headers,
      (frame) => {
        console.log('sub 하기전', decoded.sub);
      },
      (error) => {
        console.log('연결 실패', error);
      },
    );
  };

  // axios 로 fastapi 에 사진 요청보내기
  // 이미지 받아오기
  async function getImg() {
    // axios로 fastapi 에 이미지 보내기
    await http({
      method: 'get',
      url: '/member/face-url',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setInfo(res.data);
        console.log('이미지를 받았습니다.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 라벨링 할 인물 이미지 로컬에서 가져오기
  const loadImage = async () => {
    // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
    // const labels = [name];

    // 학습시키기 위한 데이터셋 라벨들 넣기
    const labels = [];
    for (let i = 1; i <= 60; i += 1) {
      labels.push(i.toString());
    }

    labels.push(myinfo.didAddress);
    // labels.push('사용자 did 주소');

    return Promise.all(
      labels.map(async (label) => {
        let imageUrl;
        let images;
        if (label === myinfo.didAddress) {
          // if (label === '사용자 did 주소') {
          // imageUrl = (await fetch(myinfo.faceUrl)).blob;
          imageUrl = myinfo.faceUrl;
          // imageUrl =
          //   'https://storage.googleapis.com/cc24-3d5b1.appspot.com/9f34f632-4fa2-4686-afbb-dd163b3c0d1b-boyoung-p7ijrk9wj3f8pnz8dwq47kbr3a.jpg?GoogleAccessId=firebase-adminsdk-flw87%40cc24-3d5b1.iam.gserviceaccount.com&Expires=1711965112&Signature=ck6lIcmkALOR5K6ql8%2FjfpbLZRmHP2JYnkrJl%2BJoTBXgeJWmRlfVv9Goh2fkoQnhDOQUQemXDkiN3Hya8CMcwhljY1SdcBW4DWpeJaXx4C9bMRmPgiPIKOaGypXyh8HHgsp6V2oO6Pk17yectcNJoRIRk%2BFayBGrNt94U4aR2mrg768%2BKvZY%2F%2FtfAeiWtisGiymv848E0PGi7Qsi08CbpxY88EUOq4C4wwyAqLyuW2CxkNlsq0H8aCTZxoLU1NuIFLfej82aIw8w61D6EFu9dsC7BAfa%2FSE113tnfWS%2FWSKO6%2BujnKCn2zLRHjMh6Uv9wfj5q3lVfwiutKL082yisQ%3D%3D';
        } else {
          imageUrl = `/imgs/${label}.jpg`;
        }
        images = await faceapi.fetchImage(imageUrl);

        let descriptions = [];

        const detections = await faceapi
          .detectSingleFace(images)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      }),
    );
  };

  // 영상 권한 요청
  const startVideo = () => {
    setIsStartDetect(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setNotice('얼굴인증을 시작합니다.');
      })
      .catch((err) => console.error(err));
  };

  const onPlay = async () => {
    setNotice('마스크를 벗고 정면을 바라봐주세요.');
    // 이미지 정보를 기반으로 canvas 요소 생성
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    console.log(canvas);
    wrapRef.current.append(canvas);
    const setSizeCanvas = document.querySelector('canvas');
    console.log(setSizeCanvas);
    setSizeCanvas.className = 'w-64 mx-auto my-10 rounded-3xl absolute left-7'; // 비디오 크기, 위치 맞춰 다시 설정

    // 영상 사이즈를 canvas에 맞추기 위한 설정
    const displaySize = {
      width: 300,
      height: 300,
    };

    // canvas 사이즈를 맞춤
    faceapi.matchDimensions(canvas, displaySize);

    // 로컬 대조 이미지 가져오기
    const imgDescriptors = await loadImage();

    // 안면 인식 부분
    const faceDetecting = async () => {
      // setNotice(['인', '증', '중', '입', '니', '다']);
      setNotice('인증 중입니다.');
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // canvas 초기화
      canvas
        .getContext('2d')
        .clearRect(0, 0, displaySize.width, displaySize.height);

      const faceMatcher = new faceapi.FaceMatcher(imgDescriptors, 0.6);

      resizedDetections.forEach((d) => faceMatcher.findBestMatch(d.descriptor));

      resizedDetections.forEach((detection, i) => {
        const matched = resizedDetections[i];
        const { box } = matched.detection;
        // const label = faceMatcher.findBestMatch(matched.descriptor).toString();
        const result = faceMatcher.findBestMatch(matched.descriptor);
        const drawBox = new faceapi.draw.DrawBox(box);
        drawBox.draw(canvas);
        if (result._distance > 0.4 || result._label === 'unknown') {
          setRecog(true);
          console.log('다른사람인디.');
        } else if (result.label === myinfo.didAddress) {
          console.log(result.label, result._distance);
          setRecog(true);
          setisRight(true);
          setNotice('인증 완료!');
        } else {
          setRecog(true);
          console.log('다른사람인디.');
        }
      });
    };

    const loop = () => {
      faceDetecting();
      setTimeout(loop, 1);
    };
    setTimeout(loop, 1);
  };

  const startDetecting = async () => {
    // model load
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        // video 에서 로드된 이미지 매칭 시 아래 모델이 필요 함.
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
        startVideo();
      });
    };

    loadModels();
  };

  useEffect(() => {
    if (recog && isRight) {
      console.log('얼굴인식 완료, 영상 끄기');
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      const video = document.querySelector('video');
      const canvas = document.querySelector('canvas');
      setTimeout(() => {
        tracks.forEach((track) => {
          track.stop();
        });
        video.remove();
        canvas.remove();
      }, 2000);
      if (whatpage === 'chat') {
        console.log('대기로 이동');
        // navigate(`/chatwindow/${id}`);
      } else {
        setStep(true);
      }
    } else if (recog && !isRight) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      const video = document.querySelector('video');
      const canvas = document.querySelector('canvas');
      setTimeout(() => {
        tracks.forEach((track) => {
          track.stop();
        });
        video.remove();
        canvas.remove();
      }, 2000);
      setNotice('인증에 실패하였습니다.');
      setTimeout(() => {
        navigate('/main');
      }, 2000);
    }
  }, [recog]);

  useEffect(() => {
    if (location.pathname === '/faceRecog/chat') {
      setPage('chat');
    } else {
      setPage('signup');
    }
    getImg();
    startDetecting();
    websocket();
    createChatting();
  }, []);

  return (
    <div>
      <div
        className={
          whatpage === 'chat'
            ? 'w-[22.5rem] h-[48.75rem]'
            : 'bg-white w-[22.5rem] h-[48.75rem]'
        }
      >
        <div className="mx-auto text-center">
          <img
            src={whatpage === 'chat' ? { ommheart } : '/heart-step-1.svg'}
            alt=""
            className={
              whatpage === 'chat'
                ? 'mx-auto w-40 pt-24 pb-6'
                : 'mx-auto w-48 pt-16 pb-10'
            }
          />
        </div>
        <h1 className="text-center text-2xl text-[#364C63] mb-3">본인 확인</h1>
        <p
          className={
            whatpage === 'chat'
              ? 'text-center text-xs text-white font-sans'
              : 'text-center text-xs text-gray-400 font-sans'
          }
        >
          본인이 맞는지 얼굴을 확인해요
        </p>
        <div className="flex-col w-80 mx-auto">
          <div ref={wrapRef} className="h-fit relative">
            {!isStartDetect && (
              <img src="/FaceId.svg" className="w-64 mt-10 mx-auto" alt="" />
            )}
            <video
              ref={videoRef}
              autoPlay
              muted
              onPlay={() => {
                onPlay();
              }}
              width={300}
              height={300}
              className="w-64 mx-auto my-10 rounded-3xl absolute left-7"
            />
          </div>
          {/* {isStartDetect &&
            notice &&
            Array.isArray(notice) &&
            notice.map((one) => (
              <div className="text-center text-[#364C63] mt-5 bouncing-text">
                <div className={one}>{one}</div>
              </div>
            ))} */}
          {isStartDetect && notice && (
            <div className="text-center text-[#364C63] mt-5">{notice}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaceRecog;
