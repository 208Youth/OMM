import React, { useState } from "react";
import LocalStorageComponent from './LocalStorageComponent';

function Login() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);

  // 파일 생성 함수
  const createFile = () => {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(
      window.TEMPORARY,
      1024 * 1024,
      (fs) => {
        fs.root.getFile(
          "test.txt",
          { create: true },
          (fileEntry) => {
            console.log("파일 생성 완료");
          },
          errorHandler
        );
      },
      errorHandler
    );
  };

  // 파일 조회 함수
  const readFile = () => {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    window.requestFileSystem(
      window.TEMPORARY,
      1024 * 1024,
      (fs) => {
        fs.root.getFile(
          "test.txt",
          {},
          (fileEntry) => {
            fileEntry.file((file) => {
              const reader = new FileReader();

              reader.onloadend = () => {
                console.log("파일 내용:", reader.result);
                setText(reader.result)
              };

              reader.readAsText(file);
            }, errorHandler);
          },
          errorHandler
        );
      },
      errorHandler
    );
  };
  // 파일 수정 함수
  const updateFile = () => {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    window.requestFileSystem(
      window.TEMPORARY,
      1024 * 1024,
      (fs) => {
        fs.root.getFile(
          "test.txt",
          { create: false },
          (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
              fileWriter.onwriteend = () => {
                console.log("파일 수정 완료");
              };

              const blob = new Blob(["이게뭐이;ㅁ"], { type: "text/plain" });

              fileWriter.write(blob);
            }, errorHandler);
          },
          errorHandler
        );
      },
      errorHandler
    );
  };
  // 파일 삭제 함수
  function deleteFile() {
    window.requestFileSystem(
      window.TEMPORARY,
      1024 * 1024,
      function (fs) {
        fs.root.getFile(
          "test.txt",
          {},
          function (fileEntry) {
            fileEntry.remove(function () {
              console.log("File deleted successfully");
            }, errorHandler);
          },
          errorHandler
        );
      },
      errorHandler
    );
  }
  // 에러 핸들러 함수
  const errorHandler = (e) => {
    console.error("에러:", e);
  };

  return (
    <div>
      <button onClick={createFile}>파일 생성</button>
      <button onClick={readFile}>파일 조회</button>
      <button onClick={updateFile}>파일 수정</button>
      <button onClick={deleteFile}>파일 삭제</button>
      <span>{text}</span>
      <LocalStorageComponent />
    </div>
  );
};

export default Login;
