import React from 'react';
import Button from '../Button';
import Title from '../Title';

const OrderContent = ({ currentOrder }) => {
    function addToBasket() {
        const basketOrders = JSON.parse(localStorage.getItem("basket")) || [];
        let flag = true;
        basketOrders.forEach(element => {
            if (element.orderId === currentOrder.orderId) {
                flag = false;
            }
        });

        if (flag) {
            basketOrders.push(currentOrder);
            localStorage.setItem("basket", JSON.stringify(basketOrders));
        }
    }
    return (
        <div className="order-content">
            <Title text={currentOrder?.title} />
            <div className='order-content__image'><img src={currentOrder?.image} alt="order image" /></div>
            <div className="order-content__body">
                <div className="order-content__body-item">
                    <h2>Category</h2>
                    <p>{currentOrder?.category}</p>
                </div>
                <div className="order-content__body-item">
                    <h2>Describe</h2>
                    <p>{currentOrder?.describe}</p>
                </div>
                <div className="order-content__body-item">
                    <h2>Phone Number</h2>
                    <p>{currentOrder?.phone}</p>
                </div>
                <div className="order-content__body-item">
                    <h2>Price</h2>
                    <p>{currentOrder?.price}$</p>
                </div>
                <div className="order-content__body-item">
                    <h2>Seller</h2>
                    <p>{currentOrder?.username}</p>
                </div>
            </div>
            <div className="order-content__button">
                <Button text={"Add To Basket"} onSubmit={() => addToBasket()} />
            </div>
        </div>
    )
}

export default React.memo(OrderContent)