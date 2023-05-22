import { Dialog, Transition } from "@headlessui/react"
import { QrScanner } from "@yudiel/react-qr-scanner"
import Image from "next/image"
import React, { Fragment, useState } from "react"

interface Res_body {
	success: boolean
	response: string
}

const success = (
	<div className="flex flex-col gap-4 items-center">
		<Image alt="success" src={"/success.svg"} height={45} width={45} />
		<Dialog.Title
			as="h3"
			className="text-lg font-medium leading-6 text-gray-900 text-center"
		>
			Redemption successful
		</Dialog.Title>
	</div>
)

const fail = (msg: string) => (
	<div className="flex flex-col gap-4 items-center">
		<Image alt="fail" src={"/error.svg"} height={45} width={45} />
		<Dialog.Title
			as="h3"
			className="text-lg font-medium leading-6 text-gray-900 text-center"
		>
			{msg}
		</Dialog.Title>
	</div>
)

const ScanQRCode = () => {
	const [isScanned, setIsScanned] = useState<boolean>(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [status, setStatus] = useState(success)
	const endpoint =
		process.env.NEXT_PUBLIC_API_ENDPOINT ?? "http://localhost:8080"

	const redeem = async (obj: string) => {
		const req = new Request(endpoint + "/qr/redeem", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: obj,
		})
		const res = await fetch(req)
		const res_body = (await res.json()) as Res_body
		if (!res.ok)
			throw new Error(
				res_body?.response ?? "Invalid QR code, please try again!"
			)
		return res_body.success
	}
	if (!isScanned)
		return (
			<QrScanner
				onDecode={(result) => {
					setIsScanned(true)
					redeem(result)
						.then(() => {
							setStatus(success)
							setIsOpenModal(true)
						})
						.catch((err) => {
              if (err instanceof Error) {
                setStatus(fail(err.message))
              }
                setStatus(fail('Invalid QR code, please try again!'))
                setIsOpenModal(true)
						})
				}}
				onError={(error) => console.log(error?.message)}
			/>
		)
	return (
		<div className="flex flex-col justify-center items-center">
			<Image src={"/loading.svg"} alt="loading" width={100} height={100} />
			<h4>Please Wait</h4>
			<Transition appear show={isOpenModal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all font-dm-sans">
									{status}
									<div className="mt-4 flex w-full">
										<button
											type="button"
											className="bg-[#3D00B7] py-4 px-7 text-white rounded-2xl w-full"
											onClick={() => {
												setIsScanned(false)
												setIsOpenModal(false)
											}}
										>
											OK
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default ScanQRCode
