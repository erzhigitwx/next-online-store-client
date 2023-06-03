import FilterContent from '@/components/filter/FilterContent'
import React from 'react'
import "../styles/filter.scss"
import { getData } from '@/utils/getData'

const Filter = ({ orders }) => {
    console.log(orders);
    return (
        <div className="filter">
            <FilterContent orders={orders} />
        </div>
    )
}

export async function getServerSideProps() {
    const result = await getData("https://next-online-store-api-production.up.railway.app/orders")
    return {
        props: {
            orders: result
        }
    }
}

export default Filter