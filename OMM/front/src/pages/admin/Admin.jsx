import React from 'react'

function Admin() {
    return (
        <div className='bg-white w-[22.5rem] h-[48.75rem] p-2'>
            <h1 className='text-xl m-5'>관리자 페이지</h1>
            <h1 className='text-lg m-5'>신고 내역 관리</h1>
            <div>
                <h1 className='text-md m-5'>미처리</h1>
                <div class="flex justify-center">
                    <table class="w-[20rem] text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-3 py-3">
                                    번호
                                </th>
                                <th scope="col" class="px-3py-3">
                                    카테고리
                                </th>
                                <th scope="col" class="px-3 py-3">
                                    피신고자
                                </th>
                                <th scope="col" class="px-3 py-3">
                                    신고자
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    1
                                </th>
                                <td class="px-3 py-4">
                                    성희롱
                                </td>
                                <td class="px-3 py-4">
                                    쁘띠용용
                                </td>
                                <td class="px-3 py-4">
                                    미미
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h1 className='text-md m-5'>처리</h1>
                <div class="flex justify-center">
                    <table class="w-[20rem] text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-3 py-3">
                                    번호
                                </th>
                                <th scope="col" class="px-3py-3">
                                    카테고리
                                </th>
                                <th scope="col" class="px-3 py-3">
                                    피신고자
                                </th>
                                <th scope="col" class="px-3 py-3">
                                    신고자
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    1
                                </th>
                                <td class="px-3 py-4">
                                    성희롱
                                </td>
                                <td class="px-3 py-4">
                                    쁘띠용용
                                </td>
                                <td class="px-3 py-4">
                                    미미
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin