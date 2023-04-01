import React, { useState, useRef, useEffect } from 'react';
import { TinyFaceDetectorOptions } from 'face-api.js';
import * as faceapi from 'face-api.js';
import './FaceRecog.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

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

function FaceRecog() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [isStartDetect, setIsStartDetect] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [notice, setNotice] = useState('');
  const [recog, setRecog] = useState(false);
  const [whatpage, setPage] = useState('');

  const location = useLocation();
  const fromPage = location.state.page;
  console.log(fromPage);

  // axios 로 fastapi 에 사진 요청보내기
  // 이미지 받아오기
  async function getImg() {
    // axios로 fastapi 에 이미지 보내기
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/image',
      data: {
        getname: 'c최윤하',
      },
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    })
      .then((res) => {
        console.log(res);
        console.log('이미지를 받았습니다.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 받은 사진을 public에 저장(로컬에..?)

  // 라벨링 할 인물 이미지 로컬에서 가져오기
  const loadImage = async () => {
    // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
    const labels = ['boyoung', 'yangwon'];

    return Promise.all(
      labels.map(async (label) => {
        const images = await faceapi.fetchImage(`./imgs/${label}.jpg`);
        const descriptions = [];
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
    setNotice('인증되기까지 잠시만 기다려주세요.');
    // 이미지 정보를 기반으로 canvas 요소 생성
    console.log('캔버스 그리기 시작');
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    console.log(canvas);
    wrapRef.current.append(canvas);
    const setSizeCanvas = document.querySelector('canvas');
    console.log(setSizeCanvas);
    setSizeCanvas.className = 'recog-canvas';

    // 영상 사이즈를 canvas에 맞추기 위한 설정
    const displaySize = {
      width: 300,
      height: 300,
    };

    // canvas 사이즈를 맞춤
    faceapi.matchDimensions(canvas, displaySize);

    // 로컬 대조 이미지 가져오기
    const labeledFaceDescriptors = await loadImage();

    // 안면 인식 부분
    const faceDetecting = async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // canvas 초기화
      canvas
        .getContext('2d')
        .clearRect(0, 0, displaySize.width, displaySize.height);

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

      resizedDetections.forEach((detection, i) => {
        const matched = resizedDetections[i];
        const { box } = matched.detection;
        const label = faceMatcher.findBestMatch(matched.descriptor).toString();
        const drawBox = new faceapi.draw.DrawBox(box, {
          label,
        });
        drawBox.draw(canvas);
        setRecog(true);
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
    // const btn = document.querySelector('#startbtn');
    // btn.style.display = 'none';
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
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
    setPage(fromPage);
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(() => {
      setModelsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (recog) {
      console.log('얼굴인식 완료, 영상 끄기');
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      setTimeout(() => {
        const video = document.querySelector('video');
        const canvas = document.querySelector('canvas');
        setNotice('인증 완료!');
        tracks.forEach((track) => {
          track.stop();
        });
        video.remove();
        canvas.remove();
      }, 3000);
      // 새로고침 혹은 채팅방으로 이동
      window.location.reload();
    }
  }, [recog]);

  useEffect(() => {
    getImg();
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
            src={whatpage === 'chat' ? '/ommheart.png' : '/heart-step-1.svg'}
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
          <div ref={wrapRef} className="h-fit">
            {!isStartDetect && (
              <img
                src="/FaceId.svg"
                className="w-64 mt-10 mx-auto"
                onClick={() => {
                  startDetecting();
                }}
                alt=""
                aria-hidden
              />
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
              className="w-64 mx-auto my-10 rounded-3xl"
            />
          </div>
          {isStartDetect && notice && (
            <div className="text-center text-[#364C63]">{notice}</div>
          )}
          {whatpage !== 'chat' && (
            <div className="flex justify-between mx-8 text-[#364C63] text-lg">
              <div>&lt; </div>
              <div aria-hidden onClick={() => {}}>
                &gt;
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaceRecog;
