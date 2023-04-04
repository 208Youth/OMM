import React, { useState, useRef, useEffect } from 'react';
import { TinyFaceDetectorOptions } from 'face-api.js';
import * as faceapi from 'face-api.js';
import './FaceRecog.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const navigate = useNavigate();
  const fromPage = location.state.page;
  console.log(fromPage);

  // axios 로 fastapi 에 사진 요청보내기
  // 이미지 받아오기
  async function getImg() {
    // axios로 fastapi 에 이미지 보내기
    await axios({
      method: 'get',
      url: 'http://localhost:8000/image',
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

  // 라벨링 할 인물 이미지 로컬에서 가져오기
  const loadImage = async () => {
    // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
    // const labels = [name];

    // 학습시키기 위한 데이터셋 라벨들 넣기
    const labels = ['boyoung'];

    // 내이름 추가
    return Promise.all(
      labels.map(async (label) => {
        // const images = await faceapi.fetchImage(didaddress 에 있는 firebase url 주소 가져오기);
        const images = await faceapi.fetchImage(
          'https://storage.googleapis.com/cc24-3d5b1.appspot.com/9f34f632-4fa2-4686-afbb-dd163b3c0d1b-boyoung-p7ijrk9wj3f8pnz8dwq47kbr3a.jpg?GoogleAccessId=firebase-adminsdk-flw87%40cc24-3d5b1.iam.gserviceaccount.com&Expires=1711965112&Signature=ck6lIcmkALOR5K6ql8%2FjfpbLZRmHP2JYnkrJl%2BJoTBXgeJWmRlfVv9Goh2fkoQnhDOQUQemXDkiN3Hya8CMcwhljY1SdcBW4DWpeJaXx4C9bMRmPgiPIKOaGypXyh8HHgsp6V2oO6Pk17yectcNJoRIRk%2BFayBGrNt94U4aR2mrg768%2BKvZY%2F%2FtfAeiWtisGiymv848E0PGi7Qsi08CbpxY88EUOq4C4wwyAqLyuW2CxkNlsq0H8aCTZxoLU1NuIFLfej82aIw8w61D6EFu9dsC7BAfa%2FSE113tnfWS%2FWSKO6%2BujnKCn2zLRHjMh6Uv9wfj5q3lVfwiutKL082yisQ%3D%3D',
        );
        const descriptions = [];
        // const tyniOptions = new faceapi.TinyFaceDetectorOptions({
        //   inputSize: 700,
        //   scoreThreshold: 0.5,
        // });
        const detectionOptions = new faceapi.SsdMobilenetv1Options({
          minConfidence: 0.8,
        });
        const detections = await faceapi
          // .detectAllFaces(videoRef.current, detectionOptions)
          .detectSingleFace(images, detectionOptions)
          .withFaceLandmarks()
          .withFaceDescriptor();
        console.log('얼굴 감지', detections);
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
    // console.log('캔버스 그리기 시작');
    // const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    // console.log(canvas);
    // wrapRef.current.append(canvas);
    // const setSizeCanvas = document.querySelector('canvas');
    // console.log(setSizeCanvas);
    // setSizeCanvas.className = 'recog-canvas';

    // 영상 사이즈를 canvas에 맞추기 위한 설정
    const displaySize = {
      width: 300,
      height: 300,
    };

    // canvas 사이즈를 맞춤
    // faceapi.matchDimensions(canvas, displaySize);

    // 로컬 대조 이미지 가져오기
    const labeledFaceDescriptors = await loadImage();

    // 안면 인식 부분
    const faceDetecting = async () => {
      const detectionOptions = new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.8,
      });
      const detections = await faceapi
        // .detectAllFaces(videoRef.current, new TinyFaceDetectorOptions())
        .detectAllFaces(videoRef.current, detectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // canvas 초기화
      // canvas
      //   .getContext('2d')
      //   .clearRect(0, 0, displaySize.width, displaySize.height);

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor),
      );

      results.forEach((result, i) => {
        if (result.distance < 0.6) {
          console.log(`동일한 사람임 ${result.label}!`);
          // const { box } = result.detection;
          // const label = result.distance.toString();
          // const drawBox = new faceapi.draw.DrawBox(box, {
          //   label,
          // });
          // drawBox.draw(canvas);
          setNotice('인증 완료!');
          setRecog(true);
        } else {
          console.log('다른사람인디.');
          setNotice('얼굴인증에 실패하였습니다.');
          // 다시 메인으로 보내기
          navigate('/main');
        }
      });
      // resizedDetections.forEach((detection, i) => {
      //   const matched = resizedDetections[i];
      //   const { box } = matched.detection;
      //   const label = faceMatcher.findBestMatch(matched.descriptor).toString();
      //   const bestMatch = faceMatcher.findBestMatch(matched.descriptor);

      // console.log(
      //   '가장 잘맞는 사람 라벨:',
      //   bestMatch.label,
      //   '일치 수치:',
      //   bestMatch.distance,
      // );

      // });
    };

    const loop = () => {
      faceDetecting();
      setTimeout(loop, 1);
    };
    setTimeout(loop, 1);
  };

  // const startDetecting = async () => {
  //   // model load
  //   // const btn = document.querySelector('#startbtn');
  //   // btn.style.display = 'none';
  //   const loadModels = async () => {
  //     Promise.all([
  //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  //       // video 에서 로드된 이미지 매칭 시 아래 모델이 필요 함.
  //       faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
  //       // faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
  //     ]).then(() => {
  //       setModelsLoaded(true);
  //       startVideo();
  //     });
  //   };

  //   loadModels();
  // };

  useEffect(() => {
    setPage(fromPage);
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
        startVideo();
      });
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (recog) {
      console.log('얼굴인식 완료, 영상 끄기');
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      setTimeout(() => {
        const video = document.querySelector('video');
        const canvas = document.querySelector('canvas');
        tracks.forEach((track) => {
          track.stop();
        });
        video.remove();
        canvas.remove();
        if (whatpage === 'chat') {
          console.log('대기로 이동');
          navigate('/loading');
        } else {
          navigate('/moreinfo');
        }
      }, 3000);
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
          {/* {whatpage !== 'chat' && (
            <div className="flex justify-between mx-8 text-[#364C63] text-lg">
              <div>&lt; </div>
              <div aria-hidden onClick={() => {}}>
                &gt;
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default FaceRecog;
