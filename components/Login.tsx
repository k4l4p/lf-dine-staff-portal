import Image from 'next/image'
import React from 'react'

interface LoginProp {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  login: (pw: string) => void
}

const Login = ({ login, password, setPassword }: LoginProp) => {
  return (
    <>
      <input
        name="name"
        type={'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
      />
      <button
        onClick={() => {
          login(password)
        }}
        className="bg-[#3D00B7] py-4 px-7 text-white rounded-2xl"
      >
        Login
      </button>
    </>
  )
}

export default Login
