import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '@/api/http';

function Detail() {
  const { id } = useParams();
  console.log(id);
  const [isSuspended, setIsSuspended] = useState(false);
  const [target, setTarget] = useState(null);
  const [action, setAction] = useState(null);
  const [reason, setReason] = useState(null);
  const [report, setReport] = useState({});

  useEffect(() => {
    http.get(`admin/report/${id}`).then(({ data }) => {
      setReport(data);
      console.log(data);
    });
  }, [id]);

  const category = {
    SEXUAL_HARASS: '성희롱',
    PROMOTION: '홍보, 광고',
    THREATEN: '위협',
    HATE: '혐오',
    ETC: '기타',
  };

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem] p-2">
      <h1 className="text-xl m-3">관리자 페이지</h1>
      <h1 className="text-lg m-3">
        카테고리 :
        {category[report.category]}
      </h1>
      <h1 className="text-md m-3">첨부 파일</h1>
      <div className="flex justify-center">
        <img
          className="w-[20rem] h-[10rem]"
          src="../../../public/ommheart.png"
          alt=""
        />
      </div>
      <h1 className="text-md m-3">상세 사유</h1>
      <div className="flex justify-center">
        <div className="border border-zinc-900 w-[20rem] h-[5rem] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
          {report.reason}
        </div>
      </div>
      <form>
        <h1 className="text-md m-3">조치</h1>
        <div className="flex justify-evenly">
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              onChange={(e) => setTarget(e.target.value)}
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {report.memberInfo?.memberNickname}
            </label>
          </div>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              onChange={(e) => setTarget(e.target.value)}
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-checkbox-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {report.reportedMemberInfo?.reportedMemberNickname}
            </label>
          </div>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              onChange={(e) => setTarget(e.target.value)}
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-checkbox-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              이상없음
            </label>
          </div>
        </div>
        <h1 className="text-md m-3">내용</h1>
        <div className="flex justify-center">
          <div
            className="flex items-center mr-4"
            onClick={() => {
              setIsSuspended(false);
              setAction();
            }}
          >
            <input
              id="inline-radio"
              type="radio"
              value=""
              name="inline-radio-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="inline-radio"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              계정 삭제
            </label>
          </div>
          <div
            className="flex items-center mr-4"
            onClick={() => {
              setIsSuspended(true);
              setAction();
            }}
          >
            <input
              id="inline-2-radio"
              type="radio"
              value=""
              name="inline-radio-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="inline-2-radio"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              계정 정지
            </label>
            {isSuspended && (
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  id="small-input"
                  className="block w-[2rem] mx-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {' '}
                <span className="block text-sm">일 동안</span>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-md m-3">이유</h1>
        <div className="flex justify-center">
          <input
            onChange={(e) => setReason(e.target.value)}
            type="text"
            id="small-input"
            className="block w-[20rem] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto mt-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default Detail;
