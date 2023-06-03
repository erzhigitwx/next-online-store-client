import React from 'react'
import "../styles/order.scss"
import { CreateOrderContentSSR } from '@/components/createOrder/CreateOrderContentSSR'

const CreateOrder = () => {
    return (
        <div>
            <CreateOrderContentSSR />
        </div>
    )
}

export default CreateOrder