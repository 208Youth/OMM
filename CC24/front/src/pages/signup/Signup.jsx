import './Signup.css';
import React from "react";

function Signup() {
  return (
  <div className='wrap-box'>
    <div class="flex-col w-80 mx-auto">
      <p class="text-3xl text-left mb-4 leading-relaxed">
        회원
        <br />
        가입
      </p>
    <form>
      <div class="mb-6">
        <div>
            <label for="name" class="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
            <input type="text" id="name" class="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="김미미"/>
        </div>
          <label for="age" class="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">생년월일</label>
          <div class="flex mt-6">
            <div>
              <select id="years" class="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>2003</option>
                <option>2002</option>
                <option>2001</option>
                <option>2000</option>
                <option>1999</option>
                <option>1998</option>
                <option>1997</option>
                <option>1996</option>
                <option>1995</option>
                <option>1994</option>
                <option>1993</option>
                <option>1992</option>
                <option>1991</option>
                <option>1990</option>
                <option>1989</option>
                <option>1988</option>
                <option>1987</option>
                <option>1986</option>
                <option>1985</option>
              </select>
            </div>
            <span class="p-2 mb-6 mr-3" >년</span>
            <div>
              <select id="months" class="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <span class="p-2 mb-6 mr-3">월</span>
            <div>
              <select id="days" class="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
            </div>
            <span class="p-2 mb-6 mr-3">일</span>
          </div>
          <label for="sex" class="block mb-6 text-sm font-medium text-gray-900 dark:text-white">성별</label>
          <div class="flex mb-6">
            <div class="flex items-center mr-4">
                <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">남</label>
            </div>
            <div class="flex items-center mr-4">
                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">여</label>
            </div>
          </div>
          <div class="grid grid-cols-6 gap-4 my-6">
            <div for="face" class="col-start-1 col-end-3">얼굴인식</div>
            <div class="col-end-7 col-span-1">
              <button class="">촬영</button>
              <svg class="w-6" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        <div className="mx-auto text-center">
          <button type="submit" className="btn">회원 가입</button>
        </div>
      </div>
    </form>
    </div>
  </div>
  )
}

export default Signup;