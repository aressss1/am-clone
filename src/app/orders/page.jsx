'use client'

import Header from '@/components/Header'
import Order from '@/components/Order'
import { selectUser } from '@/store/userSlice'
import moment from 'moment/moment'
import React from 'react'
import { useSelector } from 'react-redux'

const page = ({ orders }) => {
  const user = useSelector(selectUser)

  return (
    <div>

      
      <Header />

      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400' >
          Your Orders
        </h1>

        {user ?
          <>
          <h2>{orders?.length} order</h2>
          </>
          :
          <>
          <h2>Please SignIn to see your orders</h2>
          </>}

          <div className='mt-5 space-y-4' >
              {orders?.map(order  => (
                <Order order={order} key={order.id} />
              ))}
          </div>
      </main>

    </div>
  )
}

export default page

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  if(!user){
    return {
      props: {}
     }
  }

  const stripeOrders = await db
    .collection("user")
    .doc(user.email)
    .collection("orders")
    .orderBy('timestamp' , 'desc')
    .get();

    const orders = await Promise.all(
      stripeOrders.docs.map(async (order) => ({
        id:order.id,
        amount:order.data().amount,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate().unix()),
        items : (
          await stripe.checkout.session.listLineItems(order.id , {
            limit: 100
          })
        ).data
      }))
    )

    return {
      props: {
        orders
      }
    }
}