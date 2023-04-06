import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '@/api/http';
import Report from '@/components/Report';

function Admin() {
  const [notProcessed, setNotProcessed] = useState([]);
  const [processed, setProcessed] = useState([]);
  const token = localStorage.getItem('accesstoken');

  const navigate = useNavigate();

  const gotoDetail = (id) => {
    navigate(`/admin/detail/${id}`);
  };

  useEffect(() => {
    const process = [];
    const notProcess = [];

    http({
      method: 'get',
      url: '/admin/report',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      data.list.map((report) => {
        if (report.state) process.push(report);
        else notProcess.push(report);
      });
      setNotProcessed(notProcess);
      setProcessed(process);
    });
  }, []);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem] p-2">
      <h1 className="text-xl m-5">관리자 페이지</h1>
      <h1 className="text-lg m-5">신고 내역 관리</h1>
      <div>
        <h1 className="text-md m-5">미처리</h1>
        <div className="flex justify-center">
          <table className="w-[20rem] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  번호
                </th>
                <th scope="col" className="px-3py-3">
                  카테고리
                </th>
                <th scope="col" className="px-3 py-3">
                  피신고자
                </th>
                <th scope="col" className="px-3 py-3">
                  신고자
                </th>
              </tr>
            </thead>
            <tbody>
              {notProcessed &&
                notProcessed.map((report, index) => (
                  <Report
                    report={report}
                    index={index}
                    isProcessed={false}
                    moveTo={(res) => {
                      if (res) {
                        gotoDetail(report.reportId);
                      }
                    }}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-md m-5">처리</h1>
        <div className="flex justify-center">
          <table className="w-[20rem] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  번호
                </th>
                <th scope="col" className="px-3py-3">
                  카테고리
                </th>
                <th scope="col" className="px-3 py-3">
                  피신고자
                </th>
                <th scope="col" className="px-3 py-3">
                  신고자
                </th>
              </tr>
            </thead>
            <tbody>
              {processed &&
                processed.map((report, index) => (
                  <Report report={report} isProcessed index={index} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
