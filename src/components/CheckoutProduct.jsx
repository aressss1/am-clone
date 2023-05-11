import { StarIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'

const CheckoutProduct = ({ item }) => {
    const { id, title, price, description, category, image } = item

    const dispatch = useDispatch()

    const removeFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }
    return (
        <div className='grid grid-cols-5 ' >
            <Image
                src={image}
                height={200}
                width={200}
            />

            {/* Middle */}
            <div className='col-span-3 mx-5' >
                <p>{title}</p>

                <div className="flex" >
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500 " />
                        ))
                    }
                </div>

                <p className='tetx-xs my-2 line-clamp-3'>
                    {description}
                </p>

                <div >
                    $ {price}
                </div>

                {hasPrime && (
                    <div className="flex items-center space-x-2 " >
                        <img
                            loading="lazy"
                            className="w-12"
                            src="https://links.papareact.com/fdw"
                            alt="..."
                        />
                        <p className="text-xs text-gray-500 " >FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end' >
                <button onClick={removeFromBasket} className='button'>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
