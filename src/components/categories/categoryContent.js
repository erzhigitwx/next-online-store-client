import { getOrders } from '@/utils/getOrders'
import React, { memo, useEffect, useState } from 'react'
import Title from '../Title'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CategoryContent = ({ nodeName, title }) => {
    const router = useRouter();
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getOrderData = async () => {
            setIsLoading(true)
            const result = await getOrders(nodeName)
            setOrders([...result])
            setIsLoading(false)
        }

        getOrderData()
    }, [nodeName])

    if (isLoading) {
        return (
            <div className='category-content__loading'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className='category-content__empty'>
                <h3>No orders available!</h3>
            </div>
        )
    }

    return (
        <div className="category-content">
            <Title text={title} />
            <div className="category-content__inner">
                {orders.map((order) => (
                    <Link href={`${router.asPath}/${order.orderId}`} key={order.orderId}>
                        <div className="category-content__inner-block">
                            <div className='category-content__inner-block__image'>
                                <img src={order.image} alt='order image' />
                            </div>
                            <div className="category-content__inner-block__content">
                                <p>{order.title}</p>
                                <div className="category-content__inner-block__content-price">
                                    <h2>Price: </h2>
                                    <p>{order.price}$</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default memo(CategoryContent)