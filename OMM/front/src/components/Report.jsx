function Report({ report, index }) {
  const category = {
    SEXUAL_HARASS: '성희롱',
    PROMOTION: '홍보, 광고',
    THREATEN: '위협',
    HATE: '혐오',
    ETC: '기타',
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </th>
      <td className="px-3 py-4">{category[report.category]}</td>
      <td className="px-3 py-4">{report.reportedMemberNickname}</td>
      <td className="px-3 py-4">{report.memberNickname}</td>
    </tr>
  );
}

export default Report;
