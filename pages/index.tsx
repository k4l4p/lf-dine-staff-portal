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
      <div className="max-w-sm mx-auto w-full flex flex-col px-3 py-2 h-screen">
      <div className="flex justify-center py-5">
        <Image src={'/logo.svg'} alt="LFDINE" width={102} height={29} />
      </div>
      <div className="flex flex-col justify-center items-center gap-8 grow">
        <Image src={'/front.svg'} alt="front" width={120} height={120} />
          {route()}
      </div>
    </div>
    </div>
  )
}
