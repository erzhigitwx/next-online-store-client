import OrderContent from '@/components/order/orderContent'
import React from 'react'
import "../../styles/order.scss"
import { getOrderById } from '@/utils/getOrderById'

const OrderPage = ({ currentOrder }) => {
    return (
        <div className="order-page">
            <OrderContent currentOrder={currentOrder} />
        </div>
    )
}

export default OrderPage

export async function getServerSideProps(context) {
    const { orderId } = context.query
    const result = await getOrderById(orderId)
    return {
        props: {
            currentOrder: result,
        }
    }
}