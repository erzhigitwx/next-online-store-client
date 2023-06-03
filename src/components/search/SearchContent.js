import React, { useEffect, useState } from 'react'
import TextInput from '../home/auth/TextInput'
import Title from '../Title';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchContent = ({ orders }) => {
    const [value, setValue] = useState("");
    const [suitable, setSuitable] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const ordersArray = Object.values(orders)
        const sortedOrders = ordersArray.filter((item) => item.title.includes(value) || item.describe.includes(value))
        setSuitable([...sortedOrders])
    }, [value])
    return (
        <div className="search-content">
            <Title text={"Search"} />
            <div className="search-content__input">
                <TextInput text={"Search"} placeholder='Iphone 11' value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="search-content__inner-content">
                {suitable?.length && (
                    <div className="search-content__inner">
                        {suitable?.map((order) => (
                            <Link href={`${router.asPath}/${order.orderId}`} key={order.orderId}>
                                <div className="search-content__inner-block">
                                    <div className='search-content__inner-block__image'>
                                        <img src={order.image} alt='order image' />
                                    </div>
                                    <div className="search-content__inner-block__content">
                                        <p>{order.title}</p>
                                        <div className="search-content__inner-block__content-price">
                                            <h2>Price: </h2>
                                            <p>{order.price}$</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) || <h3 className='search-content__empty'>nothing found</h3>}
            </div>
        </div>
    )
}

export default React.memo(SearchContent)