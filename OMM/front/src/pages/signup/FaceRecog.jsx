import React, { useState, useRef, useEffect } from 'react';
import { TinyFaceDetectorOptions } from 'face-api.js';
import * as faceapi from 'face-api.js';
import './FaceRecog.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../../api/http';
import ommheart from '../../assets/ommheart.png';

const MODEL_URL = '/models';

const constraints = {
  video: {
    width: 300,
    height: 300,
    facingMode: 'user',
  },
  audio: false,
};

function FaceRecog() {
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

  const token = localStorage.getItem('accesstoken');

  async function getImg() {
    await http({
      method: 'get',
      url: '/member/face-url',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loadImage = async () => {
    const labels = [];
    for (let i = 1; i <= 60; i += 1) {
      labels.push(i.toString());
    }

    labels.push(myinfo.didAddress);

    return Promise.all(
      labels.map(async (label) => {
        let imageUrl;
        let images;
        if (label === myinfo.didAddress) {
          imageUrl = myinfo.faceUrl;
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
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    wrapRef.current.append(canvas);
    const setSizeCanvas = document.querySelector('canvas');
    setSizeCanvas.className = 'w-64 mx-auto my-10 rounded-3xl absolute left-7';

    const displaySize = {
      width: 300,
      height: 300,
    };

    faceapi.matchDimensions(canvas, displaySize);

    const imgDescriptors = await loadImage();

    const faceDetecting = async () => {
      setNotice('인증 중입니다.');
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas
        .getContext('2d')
        .clearRect(0, 0, displaySize.width, displaySize.height);

      const faceMatcher = new faceapi.FaceMatcher(imgDescriptors, 0.6);

      resizedDetections.forEach((d) => faceMatcher.findBestMatch(d.descriptor));

      resizedDetections.forEach((detection, i) => {
        const matched = resizedDetections[i];
        const { box } = matched.detection;
        const result = faceMatcher.findBestMatch(matched.descriptor);
        const drawBox = new faceapi.draw.DrawBox(box);
        drawBox.draw(canvas);
        if (result._distance > 0.5 || result._label === 'unknown') {
          setRecog(true);
        } else if (result.label === myinfo.didAddress) {
          setRecog(true);
          setisRight(true);
          setNotice('인증 완료!');
          navigate('/loading');
        } else {
          setRecog(true);
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
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
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
      navigate('/loading');
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
        window.location.reload();
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
          {isStartDetect && notice && (
            <div className="text-center text-[#364C63] mt-5">{notice}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaceRecog;
