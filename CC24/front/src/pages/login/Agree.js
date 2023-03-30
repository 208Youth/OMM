/* eslint-disable */
import React from 'react';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';

function Agree() {
  const certList = useSelector((state) => state.user.cert);
  console.log(certList);
  const VCs = JSON.parse(localStorage.getItem('VC'));
  console.log(VCs);
  const iden = JSON.parse(localStorage.getItem('keypair')).identifier;
  const pk = JSON.parse(localStorage.getItem('keypair')).privateKey;
  const ethrDidOnGoerliNamed = new EthrDID({
    identifier: iden,
    privateKey: pk,
    chainNameOrId: 'goerli',
  });
  console.log(ethrDidOnGoerliNamed);
  const VCvalues = [];
  for (let i = 0; i < VCs.length; i++) {
    console.log(VCs[i]);
    VCvalues.push(Object.values(VCs[i])[0]);
  }
  console.log(VCvalues);
  
  const checkedVC = []
  const check = (e) => {
    let credentialName = ''
    if (e === '대학교') {
        credentialName = 'UniversityCredential';
      } else if (e === '자격증') {
        credentialName = 'CertificateCredential';
      } else if (e === '회사') {
        credentialName = 'JobCredential';
      } else if (e === '소득') {
        credentialName = 'IncomeCredential';
      } else if (e === '부동산') {
        credentialName = 'EstateCredential';
      } else if (e === '건강검진서') {
        credentialName = 'HealthCredential';
      }
    checkedVC.push(credentialName)
    console.log(checkedVC);
  }
  const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation', 'PersonalIdPresentation'],
      verifiableCredential: [...VCvalues],
    },
  };
  
  console.log(vpPayload.vp.verifiableCredential);
  const getVP = async () => {
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
    console.log(vpJwt);
  };
  return (
    <div>
      <h1>정보 제공 동의</h1>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">인증서 리스트</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {certList.map((cert) => (
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center pl-3">
            <input
              id="vue-checkbox"
              type="checkbox"
              value= {Object.keys(cert)}
              onClick={(e) => {check(e.target.value)}}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="vue-checkbox"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {Object.keys(cert)} - {Object.values(cert)}
            </label>
          </div>
          </li>
        ))}
      </ul>
      <button onClick={getVP}>가쟈오기</button>
      
    </div>
  );
}

export default Agree;
