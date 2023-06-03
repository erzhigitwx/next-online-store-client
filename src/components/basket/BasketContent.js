import React, { useEffect, useState } from 'react'
import Title from '../Title'
import Button from '../Button'
import Succes from './Succes'

const BasketContent = () => {
    const [basket, setBasket] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    function getFavoriteOrders() {
        setBasket(JSON.parse(localStorage.getItem("basket")) || [])
    }
    function buyOrder(order) {
        setBasket(prev => {
            return [...basket.filter(item => item.orderId !== order.orderId)]
        })
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000)
    }
    useEffect(() => {
        getFavoriteOrders()
    }, [])
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])

    return isVisible && <Succes /> || (
        !!basket.length && (
            <div className="basket-content">
                <Title text={"My Basket"} />
                <div className="basket-content__inner">
                    {basket.map((item) => (
                        <div className="basket-content__inner-block" key={item.orderId}>
                            <div className="basket-content__inner-block__image">
                                <img src={item.image} alt='order image' />
                            </div>
                            <div className="basket-content__inner-block-content">
                                <h2>{item.title}</h2>
                                <div className="basket-content__inner-block__button">
                                    <Button text={"Buy It Now"} onSubmit={() => buyOrder(item)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) || (
            <div className='category-content__empty'>
                <h3>Basket is empty</h3>
            </div>
        )
    )
}

export default React.memo(BasketContent)