import React, { useState } from "react";

const LocalStorageComponent = () => {
  const [userName, setUserName] = useState("");
  const [check, setCheck] = useState(false);

  const saveData = () => {
    const userObj = { name: userName };
    window.localStorage.setItem("userName", JSON.stringify(userObj));
  };

  const callData = () => {
    setCheck(true);
  };

  const onChange = (e) => {
    setUserName(e.target.value);
    setCheck(false);
  };
  return (
    <div>
      <input
        name="userName"
        value={userName}
        onChange={onChange}
        placeholder="이름을 입력하세요!"
      />
      <button onClick={saveData}>저장하기</button>
      <button onClick={callData}> 불러오기</button>

      {check ? <p>{window.localStorage.getItem("userName")}</p> : <> </>}
    </div>
  );
};

export default LocalStorageComponent;