import { QrScanner } from '@yudiel/react-qr-scanner'
import React from 'react'

const ScanQRCode = () => {
  return (
    <div className="max-w-sm mx-auto w-full flex flex-col px-3 py-2 h-screen">
        <QrScanner
          onDecode={(result) => console.log(result)}
          onError={(error) => console.log(error?.message)}
      />
    </div>
  )
}

export default ScanQRCode
