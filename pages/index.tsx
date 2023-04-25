import Login from '@/components/Login'
import ScanQRCode from '@/components/ScanQRCode'
import Image from 'next/image'
import { useState } from 'react'

const PASSWORD = 'lfdine'

export default function Home() {
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const login = (pw: string) => {
    if (pw === PASSWORD) {
      setIsLogin(true)
    }
  }

  const route = () => {
    if (isLogin) return <ScanQRCode />
    return <Login {...{ password, setPassword, login }} />
  }

  return (
    <div className="bg-[#F7F9FB] font-dm-sans">
      {route()}
    </div>
  )
}
