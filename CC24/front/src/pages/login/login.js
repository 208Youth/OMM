/* eslint-disable */
import React, { useState } from "react";
import Modal from 'react-modal';
import Password from './Password';

function Login() {
  const [passwordModal, setPasswordModal] = useState(true);
  const [passwordComplete, setPasswordComplete] = useState(true);
  console.log(passwordComplete);
  return (
    <div>
      <Modal
        isOpen={passwordModal}
        // onRequestClose={() => setPasswordModal(false)}
        ariaHideApp={true}
        className="Modal"
        overlayClassName="Overlay"
      >
        <Password
          setPasswordModal={setPasswordModal}
          setPasswordComplete={(res) => {
            if (res) {
              setPasswordComplete(true);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Login;
