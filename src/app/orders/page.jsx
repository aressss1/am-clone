'use client'

import Header from '@/components/Header'
import Order from '@/components/Order'
import { selectUser } from '@/store/userSlice'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { InfinitySpin } from 'react-loader-spinner'

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const user = useSelector(selectUser)


  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const stripe = require('stripe')('sk_test_51N7DYBDD4zGMqrTRjOp8A1OieyAuwKrTrioNBeRsearxqe08JXl8Xf2HpNlEff5Lym3dzU2u0ETqzXo9ocEQwwvF00mjYUDNZC');

      const ordersRef = collection(db, 'users', user.email, 'orders');
      const ordersQuery = query(ordersRef, orderBy('timestamp', 'desc'));

      try {
        const snapshot = await getDocs(ordersQuery);

        const allOrders = await Promise.all(
          snapshot.docs.map(async (order) => {
            const orderData = order.data();
            const session = await stripe.checkout.sessions.retrieve(`${order.id}`);
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

            return {
              id: order.id,
              amount: orderData.amount,
              images: orderData.images,
              timestamp: moment(orderData.timestamp.toDate()).unix(),
              items: lineItems.data,
            };
          })
        );
        setOrders(allOrders)
        setLoading(false)
      } catch (error) {
        console.log('Error fetching orders:', error);
        setLoading(false)
      }
    };

    if (user) {
      fetchOrders();
    }


  }, [user]);


  return (
    <>
      <Header />

      {loading ?
        <>
          <div className="flex justify-center items-center h-screen">
            <InfinitySpin
              width='200'
              color="#FF9900"
            />
          </div>

        </>
        :
        <>
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
              {orders?.map((order, i) => (
                <Order order={order} key={i} />
              ))}
            </div>
          </main>

        </>}


    </>
  )
}

export default Page
