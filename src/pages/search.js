import SearchContent from '@/components/search/SearchContent'
import { getData } from '@/utils/getData'
import React from 'react'
import "../styles/search.scss"

const Search = ({ orders }) => {
    return (
        <div className="search">
            <SearchContent orders={orders} />
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

export default Search