'use client'

import { useEffect, useState } from "react"
import Product from "./Product"

const ProductFeed = () => {
    const [products , setProducts] = useState()

    useEffect(() =>{
        const dataFetching = async() => {
            const res = await fetch(`https://fakestoreapi.com/products`);
                const products = await res.json();
                setProducts(products)
        }

        dataFetching()
    },[]) 

    return (
        <div>
            
            {products?.map(({ id, title, price, description, category , image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))}
        </div>
    )
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://fakestoreapi.com/products`);
//     const products = await res.json();
//     console.log(products)
   
//     // Pass data to the page via props
//     return { props: { products } };
//   }

export default ProductFeed
