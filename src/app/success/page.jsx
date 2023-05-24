'use client'

import React, { useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useDispatch } from 'react-redux'
import { basketClear } from '@/store/basketSlice'

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(basketClear())
    } , [])

    return (
        <>
            <Header />

            <div className='bg-gray-100 h-screen' >
                <main className='max-w-screen-lg mx-auto'>
                    <div className='flex flex-col p-10 bg-white'>
                        <div className='flex items-center space-x-2 mb-5'>
                            <CheckCircleIcon className='text-green-500 h-10' />
                            <h1 className='text-3xl' >
                                Thank You , your order has been confirmed!
                            </h1>
                        </div>

                        <p>
                            Thank you for shopping with us. we will send a confirmation email once your item has shipped . if you would like to check the status of your order(s) please press the link below
                        </p>
                        <button
                            onClick={() => router.push("/orders")}
                            className='button mt-8'
                        >
                            Go to my orders
                        </button>
                    </div>
                </main>

            </div>
        </>
    )
}

export default Page
