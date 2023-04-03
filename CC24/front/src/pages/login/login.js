/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import Password from './Password';
import Agree from './Agree';
import { useNavigate } from 'react-router-dom';
import ommapi from '../../api/ommapi';
import axios from 'axios';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { EthrDID } from 'ethr-did';

function Login() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get('type');
  console.log(type);
  const did = JSON.parse(localStorage.getItem('DID')).did;
  const iden = JSON.parse(localStorage.getItem('keypair')).identifier;
  const pk = JSON.parse(localStorage.getItem('keypair')).privateKey;
  const ethrDidOnGoerliNamed = new EthrDID({
    identifier: iden,
    privateKey: pk,
    chainNameOrId: 'goerli',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [vc, setVC] = useState('');
  let vc = ''
  const data = {
    holderDid: did,
  }
  
  const getVC = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: 'http://localhost:4424/api/node/credential/did-address',
      data: data,
    })
    .then((res) => {
      console.log('성공!!!!!!!!', res);
      console.log(res.data.vcJwt);
      vc = res.data.vcJwt
      })
    .then((res) => {
      console.log(res);
      ommLogin()
    })
    .catch((err) => {
      console.log(err);
    });
  navigate('/main');
  };
  const ommLogin = async () => {
    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation', 'PersonalIdPresentation'],
        verifiableCredential: vc,
      },
    };
    console.log(did);
    console.log(vc);
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
    console.log(vpJwt);
    const data = {
      type: type,
      holderDid: did,
      vpJwt: vpJwt,
    }
    await ommapi
      .post(`/sign/${type}`, data)
      .then((res) => {
        console.log(res);
        if (res.data == "#") {
          window.location.href = "http://localhost:3000/login?type=SIGNUP"
        } else {
        setIsLoading(false);
        window.location.href = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [passwordModal, setPasswordModal] = useState(true);
  const [passwordComplete, setPasswordComplete] = useState(true);
  console.log(passwordComplete);
  return (
    <div>
      <div className="flex-col w-80 mx-auto"></div>
      <div class="text-center">
        {isLoading && (
          <div class="static" role="status">
            <p className="text-3xl mt-10 text-center mb-4 leading-relaxed">로그인 중 ...</p>
            <div className="flex justify-center">
              <img
                class="z-40 absolute animate-bounce top-[175px]"
                src="../../../ommheart.png"
              ></img>
              <svg
                aria-hidden="true"
                class="z-30 inline w-[300px] h-[300px] mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-[#F59FB1]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {type == 'SIGNUP' && <Agree setIsLoading={setIsLoading} />}
      </div>
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
              if (type == 'SIGNIN') getVC();
            }
          }}
        />
      </Modal>
    </div>
  );
}

export default Login;
