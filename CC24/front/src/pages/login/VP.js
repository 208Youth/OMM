/* eslint-disable */
import React, { useCallback, useState } from 'react';
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

  const certKeys = []
  for (let i = 0; i < VCs.length; i++) {
    certKeys.push(Object.keys(VCs[i])[0]);
  }
  console.log(certKeys);
  const certs = []
  for (var e of certKeys) {
    let credentialName = ''
    if (e === 'UniversityCredential') {
      credentialName = '대학교';
    } else if (e === 'CertificateCredential') {
      credentialName = '자격증';
    } else if (e === 'JobCredential') {
      credentialName = '회사';
    } else if (e === 'IncomeCredential') {
      credentialName = 'IncomeCredential';
    } else if (e === 'EstateCredential') {
      credentialName = '부동산';
    } else if (e === 'HealthCredential') {
      credentialName = '건강검진서';
    }
    certs.push(credentialName)
  }
  console.log(certs);
  const [checkedList, setCheckedList] = useState([])
  const [isChecked, setIsChecked] = useState(false)

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value])
      return
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value))
      return
    }
    return 
  }
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked)
    checkedItemHandler(value, e.target.checked)
    console.log(value, e.target.checked);
  }
  const onSubmit = useCallback(
    (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('checkedList', checkedList);
    },
    [checkedList]
  )
  // const vpPayload = {
  //   vp: {
  //     '@context': ['https://www.w3.org/2018/credentials/v1'],
  //     type: ['VerifiablePresentation', 'PersonalIdPresentation'],
  //     verifiableCredential: [...vc],
  //   },
  // };
  
  // console.log(vpPayload.vp.verifiableCredential);
  // const getVP = async () => {
  //   const vpJwt = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
  //   console.log(vpJwt);
  // };
  const getVP = async () => {
    let vc = []
    let checkedvc = []
    let credentialName = ''
    for (var e of checkedList) {
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
      checkedvc.push(credentialName)
    }
    for (var i of checkedvc) {
      console.log(i);
      for (var j of VCs) {
        vc.push(j[i])
      }
    }
    console.log(vc);
    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation', 'PersonalIdPresentation'],
        verifiableCredential: [...vc],
      },
    };
    
    console.log(vpPayload.vp.verifiableCredential);
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
    console.log(vpJwt);
  };
  return (
    <div>
      <h1>정보 제공 동의 {checkedList} </h1>
      
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">인증서 리스트</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {certs.map((item, idx) => (
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600" key={idx}>
            <div className="flex items-center pl-3" >
            <input
              id={item}
              type="checkbox"
              // value= {Object.keys(cert)}
              checked={checkedList.includes(item)}
              onChange={(e) => {checkHandler(e, item)}}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="vue-checkbox"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item}
            </label>
          </div>
          </li>
        ))}
      </ul>
      <button onClick={getVP}>가져오기</button>
      
    </div>
  );
}

export default Agree;
