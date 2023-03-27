import React, { useState, useRef, useEffect } from 'react';
import { TinyFaceDetectorOptions } from 'face-api.js';
import * as faceapi from 'face-api.js';
import './FaceRecog.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    const btn = document.querySelector('#startbtn');
    btn.style.display = 'none';
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
      <div className="wrap-page">
      <div className="mx-auto text-center">
        <img src="../../../public/heart-step-1.svg" alt="" />
      </div>
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl my-4 text-center leading-relaxed mx-auto">
          얼굴 등록
        </p>
        <p className="text-md my-4 text-center leading-relaxed mx-auto">
          본인 인증시 사용할 얼굴을 등록해요
        </p>
      <div ref={wrapRef} className="recog-wrap">
        <img src="/FaceId.svg" onClick={() => {
          startDetecting();
        }}alt="" />
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={() => {
            onPlay();
          }}
          width={300}
          height={300}
          />
      </div>
      {isStartDetect && notice && <div>{notice}</div>}
      <div class="flex justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <Link to="/FaceRecog">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
      </div>
      </div>
    </div>
  );
}

export default FaceRecog;
