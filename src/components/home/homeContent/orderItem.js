import Button from '@/components/Button';
import React from 'react'

const OrderItem = ({ order }) => {
    return (
        <div className="home-content__order-item">
            <img src={order.image} alt="order image" />
            <div className="home-content__order-item__content">
                <div className="home-content__order-item__content-info">
                    <div className="home-content__order-item__content-info__item">
                        <h2>Title:</h2>
                        <p className='red'>{order.title}</p>
                    </div>
                    <div className="home-content__order-item__content-info__item">
                        <h2>Seller:</h2>
                        <p>{order.username}</p>
                    </div>
                </div>

                <div className="home-content__order-item__content-row">
                    <div className="home-content__order-item__content-row__price">
                        <h2>Price:</h2>
                        <p>{order.price}$</p>
                    </div>
                    <Button text={"Buy"} />
                </div>
            </div>
        </div>
    )
}

export default React.memo(OrderItem)