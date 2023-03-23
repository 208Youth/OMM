import React from 'react'
import './Index.css'

function Index() {
    return (
        <div className='background'>
            <div className='logo'>
                <div class="flex">
                    <img class="self-center" src="../../../public/ommlogo.png" alt="" />
                </div>
            </div>
            <div className='buttons'>
                <div class="grid justify-items-center">
                    <h1 class="text-white text-3xl">맞소사.</h1>
                    <h1 class="text-white text-3xl mt-2 mb-20">Oh My Match</h1>
                    <button className='btn-white'>로그인</button>
                    <button className='btn-transparent'>회원가입</button>
                </div>

            </div>
        </div>
    )
}

export default Index