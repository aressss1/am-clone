import Image from 'next/image'
import React from 'react'
import { selectItems, selectTotal } from '../store/basketSlice'
import { useSelector } from 'react-redux'
import CheckoutProduct from '@/components/CheckoutProduct'

const CheckoutPage = () => {
  const total = useSelector(selectTotal)
  const items = useSelector(selectItems)
  return (
    <div className='bg-gray-100' >
      <main
        className='lg:flex max-w-screen-2xl mx-auto'
      >
        {/* left Section*/}
        <div className='flex-grow m-5 shadow-sm' >
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
          />

          <div
            className='flex flex-col p-5 space-y-10 bg-white' >
            <h1
              className='tetx-3xl border-b gb-4'
            >
              {items.length === 0 ? 'Your Shopping Basket is empty' : " Your Shopping Basket "}
            </h1>

            {items?.map((item) => (
              <CheckoutProduct key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className='flex flex-col bg-white p-10 shadow-md ' >
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap' >
                Subtotal ({items.length} items):{" "}
                <span className='font-bold' >
                  $ {total}
                </span>
              </h2>
              {/* className={`button mt-2 ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed  '}`} */}
              <button 
              // disabled={!user}
              className='button'  >
                {/* if no user log iN ELSE PROCEED TO CHECKOUT */}
                <p>Proceed to checkout</p>
              </button>
            </>
          )}
        </div>

      </main>
    </div>
  )
}

export default CheckoutPage
