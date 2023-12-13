import React from 'react'
import InputText from '../components/InputText'
import InputPassword from '../components/InputPassword'
import Button from '../components/Button'
import User_login from '../assets/images/User_login.png'

export default function Login() {
  return (
    <div className='flex justify-center items-center h-80vh'>
      <div className='w-600px h-250px rounded-lg border border-gray-300'>
        <div className='flex p-5 gap-4'>
          <div className='w-30% mt-3'>
            <img src={User_login} alt='' />
          </div>
          <div className='w-70% flex flex-col justify-center gap-5'>
            <InputText label='Tài khoản' />
            <InputPassword label='Mật khẩu' />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button label='Đăng nhập' />
        </div>
      </div>
    </div>
  )
}
