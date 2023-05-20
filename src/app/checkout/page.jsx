'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import CheckoutProduct from '@/components/CheckoutProduct'
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '@/store/basketSlice';
import { selectUser } from '@/store/userSlice';
import axios from 'axios';

const stripe = loadStripe(
  `${process.env.STRIPE_PUBLIC_KEY}`
);

const CheckoutPage = () => {
  const total = useSelector(selectTotal)
  const items = useSelector(selectItems)
  const user = useSelector(selectUser)

 


  const createStripeCheckout = async () => {
    fetch('/api/create-checkout-session', {
      method: "POST",
      body: JSON.stringify({
        items,
        email:user.email
      }),
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })

    if (result.error) {
      alert(result.error.message);
    }
  }

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
            alt=''
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
          {items?.length > 0 && (
            <>
              <h2 className='whitespace-nowrap' >
                Subtotal ({items.length} items):{" "}
                <span className='font-bold' >
                  $ {total}
                </span>
              </h2>
              
              <button
                role="link"
                onClick={createStripeCheckout}
                disabled={!user}
                className={`button mt-2 ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed  '}`} >
                <p>{user ? "Checkout" : "Log in to checkout"}</p>
              </button>
            </>
          )}
        </div>

      </main>
    </div>
  )
}

export default CheckoutPage
